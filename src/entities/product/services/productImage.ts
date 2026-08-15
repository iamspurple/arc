"use server";
import {
	ProductImageCreateEntity,
	ProductImageUpdateEntity,
} from "@/entities/product/types/product";
import { ProductImage } from "@prisma/client";
import { productImageRepository } from "@/entities/product/repositories/productImage";
import path from "node:path";
import fs from "node:fs";
import { v4 as uuid } from "uuid";
import { deleteProductImageByFileName } from "../utils/deleteProductImageByFileName";
import { getProductOptionsByProductId } from "./productOption";

export const getProductImages = async (): Promise<ProductImage[]> => {
	try {
		return await productImageRepository.productImageList();
	} catch {
		throw new Error("Ошибка");
	}
};

export const getProductImageById = async (productImageId: string): Promise<ProductImage | null> => {
	try {
		return await productImageRepository.productImageFirst(productImageId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const getProductImageByOptionId = async (optionId: string): Promise<ProductImage[]> => {
	try {
		return await productImageRepository.productImageListByOptionId(optionId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const createProductImage = async (
	productImage: ProductImageCreateEntity
): Promise<ProductImage> => {
	try {
		const fileName = `${uuid()}.${productImage.fileObj.name.split(".")[1]}`;
		const filePath = path.resolve(process.cwd(), "static", "products");

		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath, { recursive: true });
		}

		const bytes = await productImage.fileObj.arrayBuffer();
		const buffer = Buffer.from(bytes);

		fs.writeFileSync(path.resolve(filePath, fileName), buffer);

		const createdImg = await productImageRepository.createProductImage({
			id: fileName,
			alt: productImage.alt,
			optionId: productImage.optionId,
		});

		return createdImg;
	} catch {
		throw new Error("Ошибка");
	}
};

export const createProductImages = async (
	productImages: ProductImageCreateEntity[]
): Promise<ProductImage[]> => {
	try {
		const result: ProductImage[] = [];
		for (const productImage of productImages) {
			const fileName = `${uuid()}.${productImage.fileObj.name.split(".")[1]}`;
			const filePath = path.resolve(process.cwd(), "static", "products");

			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}

			const bytes = await productImage.fileObj.arrayBuffer();
			const buffer = Buffer.from(bytes);

			fs.writeFileSync(path.resolve(filePath, fileName), buffer);

			const createdImg = await productImageRepository.createProductImage({
				id: fileName,
				alt: productImage.alt,
				optionId: productImage.optionId,
			});
			result.push(createdImg);
		}
		return result;
	} catch {
		throw new Error("Ошибка");
	}
};

export const updateProductImageById = async (
	productImage: ProductImageUpdateEntity
): Promise<ProductImage> => {
	try {
		return await productImageRepository.updateProductImage(productImage);
	} catch {
		throw Error("Ошибка");
	}
};

export const deleteProductImageById = async (productImageId: string) => {
	try {
		const deletedImage = await productImageRepository.deleteProductImage(productImageId);
		await deleteProductImageByFileName(deletedImage.id);
		return true;
	} catch (e) {
		console.error(`Не удалось удалить файл ${productImageId}:`, e);
	}
};

export const deleteImagesByOptionId = async (optionId: string) => {
	try {
		const images = await getProductImageByOptionId(optionId);

		for (const image of images) {
			const deletedImage = await productImageRepository.deleteProductImage(image.id);
			await deleteProductImageByFileName(deletedImage.id);
		}
		return true;
	} catch {
		throw Error("Ошибка");
	}
};

export const deleteImagesByProductId = async (productId: string) => {
	try {
		const options = await getProductOptionsByProductId(productId);

		for (const option of options) {
			await deleteImagesByOptionId(option.id);
		}

		return true;
	} catch {
		throw Error("Ошибка");
	}
};

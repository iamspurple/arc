"use server";
import {
	ProductImageCreateEntity,
	ProductImageUpdateEntity,
} from "@/entities/product/types/product";
import { ProductImage } from "@prisma/client";
import { productImageRepository } from "@/entities/product/repositories/productImage";

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

export const createProductImage = async (
	productImage: ProductImageCreateEntity
): Promise<ProductImage> => {
	try {
		return await productImageRepository.createProductImage(productImage);
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
		await productImageRepository.deleteProductImage(productImageId);
		return true;
	} catch {
		throw Error("Ошибка");
	}
};

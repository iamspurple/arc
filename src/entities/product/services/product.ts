"use server";
import { productRepository } from "@/entities/product/repositories/product";
import {
	type ProductCreateEntity,
	type ProductUpdateEntity,
} from "@/entities/product/types/product";
import { Product } from "@/generated/prisma/client";
import { deleteImagesByProductId } from "./productImage";
import { requireRole } from "@/lib/auth/requireAuth";
import { updateTag } from "next/cache";
import { productsCacheTagName } from "@/types/const";

export const getProducts = async (): Promise<Product[]> => {
	try {
		await requireRole("ADMIN");
		return await productRepository.productList();
	} catch {
		throw new Error("Ошибка");
	}
};

export const getProductById = async (productId: string): Promise<Product | null> => {
	try {
		await requireRole("ADMIN");
		return await productRepository.productFirst(productId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const createProduct = async (product: ProductCreateEntity): Promise<Product> => {
	try {
		await requireRole("ADMIN");
		const newProduct =  await productRepository.createProduct(product);
		updateTag(productsCacheTagName);
		return newProduct;
	} catch {
		throw new Error("Ошибка");
	}
};

export const updateProductById = async (product: ProductUpdateEntity): Promise<Product> => {
	try {
		await requireRole("ADMIN");
		const updateProduct = await productRepository.updateProduct(product);
		updateTag(productsCacheTagName);
		return updateProduct;
	} catch {
		throw Error("Ошибка");
	}
};

export const deleteProductById = async (productId: string) => {
	try {
		await requireRole("ADMIN");
		await deleteImagesByProductId(productId);
		await productRepository.deleteProduct(productId);
		updateTag(productsCacheTagName);
		return true;
	} catch {
		throw Error("Ошибка");
	}
};

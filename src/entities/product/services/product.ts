"use server";
import { productRepository } from "@/entities/product/repositories/product";
import {
	type ProductCreateEntity,
	type ProductUpdateEntity,
} from "@/entities/product/types/product";
import { Product } from "@prisma/client";

export const getProducts = async (): Promise<Product[]> => {
	try {
		return await productRepository.productList();
	} catch {
		throw new Error("Ошибка");
	}
};

export const getProductById = async (productId: string): Promise<Product | null> => {
	try {
		return await productRepository.productFirst(productId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const createProduct = async (product: ProductCreateEntity): Promise<Product> => {
	try {
		return await productRepository.createProduct(product);
	} catch {
		throw new Error("Ошибка");
	}
};

export const updateProductById = async (product: ProductUpdateEntity): Promise<Product> => {
	try {
		return await productRepository.updateProduct(product);
	} catch {
		throw Error("Ошибка");
	}
};

export const deleteProductById = async (productId: string) => {
	try {
		await productRepository.deleteProduct(productId);
		return true;
	} catch {
		throw Error("Ошибка");
	}
};
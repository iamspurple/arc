"use server";
import { ProductSizeCreateEntity, ProductSizeUpdateEntity } from "@/entities/product/types/product";
import { ProductSize } from "@/generated/prisma/client";
import { productSizeRepository } from "@/entities/product/repositories/productSize";
import { requireRole } from "@/lib/auth/requireAuth";

export const getProductSizes = async (): Promise<ProductSize[]> => {
	try {
		await requireRole("ADMIN");
		return await productSizeRepository.productSizeList();
	} catch {
		throw new Error("Ошибка");
	}
};

export const getProductSizeById = async (productSizeId: string): Promise<ProductSize | null> => {
	try {
		await requireRole("ADMIN");
		return await productSizeRepository.productSizeFirst(productSizeId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const getProductSizesByOptionId = async (
	productOptionId: string
): Promise<ProductSize[]> => {
	try {
		await requireRole("ADMIN");
		return await productSizeRepository.productSizeListByOptionId(productOptionId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const createProductSize = async (
	productSize: ProductSizeCreateEntity
): Promise<ProductSize> => {
	try {
		await requireRole("ADMIN");
		return await productSizeRepository.createProductSize(productSize);
	} catch {
		throw new Error("Ошибка");
	}
};

export const updateProductSizeById = async (
	productSize: ProductSizeUpdateEntity
): Promise<ProductSize> => {
	try {
		await requireRole("ADMIN");
		return await productSizeRepository.updateProductSize(productSize);
	} catch {
		throw Error("Ошибка");
	}
};

export const deleteProductSizeById = async (productSizeId: string) => {
	try {
		await requireRole("ADMIN");
		await productSizeRepository.deleteProductSize(productSizeId);
		return true;
	} catch {
		throw Error("Ошибка");
	}
};

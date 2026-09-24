"use server";
import {
	ProductOptionCreateEntity,
	ProductOptionUpdateEntity,
} from "@/entities/product/types/product";
import { ProductOption } from "@/generated/prisma/client";
import { productOptionRepository } from "@/entities/product/repositories/productOption";
import { deleteImagesByOptionId } from "./productImage";
import { requireRole } from "@/lib/auth/requireAuth";

export const getProductOptions = async (): Promise<ProductOption[]> => {
	try {
		await requireRole("ADMIN");
		return await productOptionRepository.productOptionList();
	} catch {
		throw new Error("Ошибка");
	}
};

export const getProductOptionsByProductId = async (productId: string): Promise<ProductOption[]> => {
	try {
		await requireRole("ADMIN");
		return await productOptionRepository.productOptionListByProductId(productId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const getProductOptionById = async (
	productOptionId: string
): Promise<ProductOption | null> => {
	try {
		await requireRole("ADMIN");
		return await productOptionRepository.productOptionFirst(productOptionId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const createProductOption = async (
	productOption: Omit<ProductOptionCreateEntity, "images">
): Promise<ProductOption> => {
	try {
		await requireRole("ADMIN");
		return await productOptionRepository.createProductOption(productOption);
	} catch {
		throw new Error("Ошибка");
	}
};

export const updateProductOptionById = async (
	productOption: ProductOptionUpdateEntity
): Promise<ProductOption> => {
	try {
		await requireRole("ADMIN");
		return await productOptionRepository.updateProductOption(productOption);
	} catch {
		throw Error("Ошибка");
	}
};

export const deleteProductOptionById = async (productOptionId: string) => {
	try {
		await requireRole("ADMIN");
		await deleteImagesByOptionId(productOptionId);
		await productOptionRepository.deleteProductOption(productOptionId);
		return true;
	} catch {
		throw Error("Ошибка");
	}
};

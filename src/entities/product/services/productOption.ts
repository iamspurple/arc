"use server";
import {
	ProductOptionCreateEntity,
	ProductOptionUpdateEntity,
} from "@/entities/product/types/product";
import { ProductOption } from "@prisma/client";
import { productOptionRepository } from "@/entities/product/repositories/productOption";

export const getProductOptions = async (): Promise<ProductOption[]> => {
	try {
		return await productOptionRepository.productOptionList();
	} catch {
		throw new Error("Ошибка");
	}
};

export const getProductOptionById = async (
	productOptionId: string
): Promise<ProductOption | null> => {
	try {
		return await productOptionRepository.productOptionFirst(productOptionId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const createProductOption = async (
	productOption: ProductOptionCreateEntity
): Promise<ProductOption> => {
	try {
		return await productOptionRepository.createProductOption(productOption);
	} catch {
		throw new Error("Ошибка");
	}
};

export const updateProductOptionById = async (
	productOption: ProductOptionUpdateEntity
): Promise<ProductOption> => {
	try {
		return await productOptionRepository.updateProductOption(productOption);
	} catch {
		throw Error("Ошибка");
	}
};

export const deleteProductOptionById = async (productOptionId: string) => {
	try {
		await productOptionRepository.deleteProductOption(productOptionId);
		return true;
	} catch {
		throw Error("Ошибка");
	}
};

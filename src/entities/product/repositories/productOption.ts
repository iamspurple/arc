import { prisma } from "@/lib/prisma";
import { ProductOption } from "@prisma/client";
import {
	ProductOptionCreateEntity,
	ProductOptionUpdateEntity,
} from "@/entities/product/types/product";

export const productOptionRepository = {
	productOptionList: async (): Promise<ProductOption[]> => {
		return prisma.productOption.findMany();
	},
	productOptionFirst: async (productOptionId: string): Promise<ProductOption | null> => {
		return prisma.productOption.findFirst({
			where: { id: productOptionId },
		});
	},
	createProductOption: async (productOption: ProductOptionCreateEntity): Promise<ProductOption> => {
		return prisma.productOption.create({
			data: productOption,
		});
	},
	updateProductOption: async (productOption: ProductOptionUpdateEntity): Promise<ProductOption> => {
		return prisma.productOption.update({
			where: { id: productOption.id },
			data: {
				title: productOption.title,
				slug: productOption.slug,
				price: productOption.price,
				hex: productOption.hex,
				colorName: productOption.colorName,
				productId: productOption.productId,
			},
		});
	},
	deleteProductOption: async (productOptionId: string): Promise<ProductOption> => {
		return prisma.productOption.delete({
			where: { id: productOptionId },
		});
	},
};

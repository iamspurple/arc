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
	productOptionListByProductId: async (productId: string): Promise<ProductOption[]> => {
		return prisma.productOption.findMany({
			where: { productId },
		});
	},
	productOptionFirst: async (productOptionId: string): Promise<ProductOption | null> => {
		return prisma.productOption.findFirst({
			where: { id: productOptionId },
		});
	},
	createProductOption: async (
		productOption: Omit<ProductOptionCreateEntity, "images">
	): Promise<ProductOption> => {
		const result = await prisma.$queryRaw<{ article: number }[]>`
    SELECT nextval('product_article_seq') AS article
  `;

		const article = result[0].article.toString();

		return prisma.productOption.create({
			data: { ...productOption, article },
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

import { prisma } from "@/lib/prisma";
import { ProductImage } from "@prisma/client";
import {
	ProductImageCreateEntity,
	ProductImageUpdateEntity,
} from "@/entities/product/types/product";

export const productImageRepository = {
	productImageList: async (): Promise<ProductImage[]> => {
		return prisma.productImage.findMany();
	},
	productImageFirst: async (productImageId: string): Promise<ProductImage | null> => {
		return prisma.productImage.findFirst({
			where: { id: productImageId },
		});
	},
	productImageListByOptionId: async (optionId: string): Promise<ProductImage[]> => {
		return prisma.productImage.findMany({
			where: { optionId: optionId },
		});
	},
	createProductImage: async (
		productImage: { id: string } & Omit<ProductImageCreateEntity, "fileObj">
	): Promise<ProductImage> => {
		return prisma.productImage.create({
			data: {
				id: productImage.id,
				optionId: productImage.optionId,
				alt: productImage.alt,
			},
		});
	},
	updateProductImage: async (productImage: ProductImageUpdateEntity): Promise<ProductImage> => {
		return prisma.productImage.update({
			where: { id: productImage.id },
			data: {
				alt: productImage.alt,
				optionId: productImage.optionId,
			},
		});
	},
	deleteProductImage: async (productImageId: string): Promise<ProductImage> => {
		return prisma.productImage.delete({
			where: { id: productImageId },
		});
	},
};

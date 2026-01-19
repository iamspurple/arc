import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { ProductCreateEntity, ProductUpdateEntity } from "@/entities/product/types/product";

export const productRepository = {
	productList: async (): Promise<Product[]> => {
		return prisma.product.findMany();
	},
	productFirst: async (productId: string): Promise<Product | null> => {
		return prisma.product.findFirst({
			where: {id: productId}
		})
	},
	createProduct: async (product: ProductCreateEntity): Promise<Product> => {
		return prisma.product.create({
			data: product,
		})
	},
	updateProduct: async (product: ProductUpdateEntity): Promise<Product> => {
		return prisma.product.update({
			where: { id: product.id },
			data: {
				description: product.description,
				composition: product.composition,
				care: product.care
			},
		});
	},
	deleteProduct: async (productId: string): Promise<Product> => {
		return prisma.product.delete({
			where: {id: productId}
		})
	}
};
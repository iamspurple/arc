import { prisma } from "@/lib/prisma";
import { ProductSize } from "@prisma/client";
import { ProductSizeCreateEntity, ProductSizeUpdateEntity } from "@/entities/product/types/product";

export const productSizeRepository = {
	productSizeList: async (): Promise<ProductSize[]> => {
		return prisma.productSize.findMany();
	},
	productSizeFirst: async (productSizeId: string): Promise<ProductSize | null> => {
		return prisma.productSize.findFirst({
			where: { id: productSizeId },
		});
	},
	createProductSize: async (productSize: ProductSizeCreateEntity): Promise<ProductSize> => {
		return prisma.productSize.create({
			data: productSize,
		});
	},
	updateProductSize: async (productSize: ProductSizeUpdateEntity): Promise<ProductSize> => {
		return prisma.productSize.update({
			where: { id: productSize.id },
			data: {
				order: productSize.order,
				size: productSize.size,
				quantity: productSize.quantity,
				parameters: productSize.parameters,
				optionId: productSize.optionId,
			},
		});
	},
	deleteProductSize: async (productSizeId: string): Promise<ProductSize> => {
		return prisma.productSize.delete({
			where: { id: productSizeId },
		});
	},
};

import { prisma } from "@/lib/prisma";
import { OrderProductOption } from "@prisma/client";
import { OrderProductOptionCreateEntity, OrderProductOptionUpdateEntity } from "../types/order";

export const orderProductOptionRepository = {
	orderProductOptionList: async (): Promise<OrderProductOption[]> => {
		return prisma.orderProductOption.findMany();
	},
	orderProductOptionListByOrderId: async (orderId: string): Promise<OrderProductOption[]> => {
		return prisma.orderProductOption.findMany({
			where: { orderId },
		});
	},
	orderProductOptionFirst: async (
		orderProductOptionId: string
	): Promise<OrderProductOption | null> => {
		return prisma.orderProductOption.findFirst({
			where: { id: orderProductOptionId },
		});
	},
	createOrderProductOption: async (
		orderProductOption: OrderProductOptionCreateEntity
	): Promise<OrderProductOption> => {
		return prisma.orderProductOption.create({
			data: orderProductOption,
		});
	},
	updateOrderProductOption: async (
		orderProductOption: OrderProductOptionUpdateEntity
	): Promise<OrderProductOption> => {
		return prisma.orderProductOption.update({
			where: { id: orderProductOption.id },
			data: {
				orderId: orderProductOption.orderId,
				optionId: orderProductOption.optionId,
				sizeId: orderProductOption.sizeId,
				quantity: orderProductOption.quantity,
			},
		});
	},
	deleteOrderProductOption: async (orderProductOptionId: string): Promise<OrderProductOption> => {
		return prisma.orderProductOption.delete({
			where: { id: orderProductOptionId },
		});
	},
};

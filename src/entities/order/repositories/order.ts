import { prisma } from "@/lib/prisma";
import { Order } from "@prisma/client";
import { OrderCreateEntity, OrderUpdateEntity } from "../types/order";

export const orderRepository = {
	orderList: async (): Promise<Order[]> => {
		return prisma.order.findMany({
			orderBy: {
				createdAt: "asc",
			},
		});
	},
	orderFirst: async (orderId: string): Promise<Order | null> => {
		return prisma.order.findFirst({
			where: { id: orderId },
		});
	},
	createOrder: async (order: OrderCreateEntity): Promise<Order> => {
		const result = await prisma.$queryRaw<{ number: number }[]>`
    SELECT nextval('order_seq') as order_number
  `;

		const number = result[0].number.toString();
		return prisma.order.create({
			data: { ...order, number },
		});
	},
	updateOrder: async (order: OrderUpdateEntity): Promise<Order> => {
		return prisma.order.update({
			where: { id: order.id },
			data: {
				customer: order.customer,
				phone: order.phone,
				email: order.email,
				contactWay: order.contactWay,
				status: order.status,
			},
		});
	},
	deleteOrder: async (orderId: string): Promise<Order> => {
		return prisma.order.delete({
			where: { id: orderId },
		});
	},
};

"use server";
import { orderRepository } from "@/entities/order/repositories/order";
import { type OrderCreateEntity, type OrderUpdateEntity } from "@/entities/order/types/order";
import { Order } from "@prisma/client";

export const getOrders = async (): Promise<Order[]> => {
	try {
		return await orderRepository.orderList();
	} catch {
		throw new Error("Ошибка");
	}
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
	try {
		return await orderRepository.orderFirst(orderId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const createOrder = async (order: OrderCreateEntity): Promise<Order> => {
	try {
		return await orderRepository.createOrder(order);
	} catch {
		throw new Error("Ошибка");
	}
};

export const updateOrderById = async (order: OrderUpdateEntity): Promise<Order> => {
	try {
		return await orderRepository.updateOrder(order);
	} catch {
		throw Error("Ошибка");
	}
};

export const deleteOrderById = async (orderId: string) => {
	try {
		await orderRepository.deleteOrder(orderId);
		return true;
	} catch {
		throw Error("Ошибка");
	}
};

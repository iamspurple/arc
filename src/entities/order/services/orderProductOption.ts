"use server";
import {
	OrderProductOptionCreateEntity,
	OrderProductOptionUpdateEntity,
} from "@/entities/order/types/order";
import { OrderProductOption } from "@prisma/client";
import { orderProductOptionRepository } from "@/entities/order/repositories/orderProductOption";

export const getOrderProductOptions = async (): Promise<OrderProductOption[]> => {
	try {
		return await orderProductOptionRepository.orderProductOptionList();
	} catch {
		throw new Error("Ошибка");
	}
};

export const getOrderProductOptionsByOrderId = async (
	orderId: string
): Promise<OrderProductOption[]> => {
	try {
		return await orderProductOptionRepository.orderProductOptionListByOrderId(orderId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const getOrderProductOptionById = async (
	orderProductOptionId: string
): Promise<OrderProductOption | null> => {
	try {
		return await orderProductOptionRepository.orderProductOptionFirst(orderProductOptionId);
	} catch {
		throw new Error("Ошибка");
	}
};

export const createOrderProductOption = async (
	orderProductOption: Omit<OrderProductOptionCreateEntity, "images">
): Promise<OrderProductOption> => {
	try {
		return await orderProductOptionRepository.createOrderProductOption(orderProductOption);
	} catch {
		throw new Error("Ошибка");
	}
};

export const updateOrderProductOptionById = async (
	orderProductOption: OrderProductOptionUpdateEntity
): Promise<OrderProductOption> => {
	try {
		return await orderProductOptionRepository.updateOrderProductOption(orderProductOption);
	} catch {
		throw Error("Ошибка");
	}
};

export const deleteOrderProductOptionById = async (orderProductOptionId: string) => {
	try {
		await orderProductOptionRepository.deleteOrderProductOption(orderProductOptionId);
		return true;
	} catch {
		throw Error("Ошибка");
	}
};

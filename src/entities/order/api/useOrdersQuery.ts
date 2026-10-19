import { Order, OrderProductOption } from "@/generated/prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, getOrderById, getOrders, updateOrderById } from "../services/order";
import {
	getOrderProductOptions,
	getOrderProductOptionsByOrderId,
} from "../services/orderProductOption";
import { OrderCreateEntity, OrderUpdateEntity } from "@/entities/order/types/order";
import { useQueryClient } from "@tanstack/react-query";

export const ORDERS_QUERY_KEY = "orders";
export const ORDER_QUERY_KEY = "order";
export const ORDER_PRODUCT_OPTIONS_QUERY_KEY = "order-product-options";
export const ORDER_PRODUCT_OPTION_QUERY_KEY = "order-product-option";

export const useOrdersQuery = () => {
	return useQuery<Order[]>({
		queryKey: [ORDERS_QUERY_KEY],
		queryFn: () => getOrders(),
		staleTime: 60_000,
	});
};

export const useOrderByIdQuery = (id: string) => {
	return useQuery<Order | null>({
		queryKey: [ORDER_QUERY_KEY, id],
		queryFn: () => getOrderById(id),
		staleTime: 60_000,
	});
};

export const useOrderProductOptionsQuery = () => {
	return useQuery<OrderProductOption[]>({
		queryKey: [ORDER_PRODUCT_OPTIONS_QUERY_KEY],
		queryFn: () => getOrderProductOptions(),
		staleTime: 60_000,
	});
};

export const useOrderProductOptionsByOrderIdQuery = (id: string) => {
	return useQuery<OrderProductOption[]>({
		queryKey: [ORDER_PRODUCT_OPTIONS_QUERY_KEY, id],
		queryFn: () => getOrderProductOptionsByOrderId(id),
		staleTime: 60_000,
	});
};

export const useCreateOrderMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<Order, Error, OrderCreateEntity>({
		mutationFn: (data) => createOrder(data),
		onSuccess: (newOrder) => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};

export const useUpdateOrderMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<Order, Error, OrderUpdateEntity>({
		mutationFn: (data) => updateOrderById(data),
		onSuccess: (updatedOrder) => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			queryClient.invalidateQueries({ queryKey: ["orders", updatedOrder.id] });
		},
	});
};

import { Order, OrderProductOption } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getOrderById, getOrders } from "../services/order";
import {
	getOrderProductOptions,
	getOrderProductOptionsByOrderId,
} from "../services/orderProductOption";

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

import {
	useOrderByIdQuery,
	useOrderProductOptionsByOrderIdQuery,
} from "@/entities/order/api/useOrdersQuery";
import {
	useProductImagesAllQuery,
	useProductOptionsQuery,
	useProductsQuery,
} from "@/entities/product/api/useProductsQuery";
import { useMemo } from "react";

import type { Status, ContactWay } from "@prisma/client";

export type FormValues = {
	id: string;
	customer: string;
	phone: string;
	email: string;
	status: Status;
	contactWay: ContactWay;
} & { options: { id?: string; optionId: string; sizeId: string; quantity: number }[] };

export const useOrderFormValues = (orderId: string) => {
	const { data: order } = useOrderByIdQuery(orderId);

	const { data: orderOptions } = useOrderProductOptionsByOrderIdQuery(orderId);

	const { data: products } = useProductsQuery();
	const { data: options } = useProductOptionsQuery();
	const { data: images } = useProductImagesAllQuery();

	const items = useMemo(() => {
		return options?.map((option) => {
			return {
				id: option.id,
				productName: products?.find((product) => product.id === option.productId)?.name as string,
				optionName: option.title,
				article: option.article,
				image: images?.find((image) => image.optionId === option.id)?.id as string,
			};
		});
	}, [products, options, images]);

	const orderItems = useMemo(() => {
		return orderOptions?.map((orderOption) => {
			const item = items?.find((i) => i.id === orderOption.optionId);

			return {
				id: orderOption.id as string,
				optionId: orderOption.optionId as string,
				sizeId: orderOption.sizeId as string,
				quantity: orderOption.quantity as number,
				productName: item?.productName as string,
				optionName: item?.optionName as string,
				article: item?.article as string,
				image: item?.image as string,
			};
		});
	}, [orderOptions, items]);

	const formValues: FormValues | null = useMemo(() => {
		if (!order || !orderItems) {
			return null;
		}
		return {
			id: order.id,
			customer: order.customer,
			phone: order.phone,
			email: order.email,
			contactWay: order.contactWay,
			status: order.status,
			options: orderItems,
		};
	}, [order, orderItems]);

	return formValues;
};

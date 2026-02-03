"use client";

import { useQuery } from "@tanstack/react-query";
import type { Product, ProductSize } from "@prisma/client";
import { getProducts, getProductSizesByOptionId } from "../server";

import type { ProductOption } from "@prisma/client";
import { getProductOptionById, getProductOptions } from "../server";

export const PRODUCTS_QUERY_KEY = ["products"];
export const PRODUCT_OPTIONS_QUERY_KEY = ["product-options"];

export const useProductsQuery = () => {
	return useQuery<Product[]>({
		queryKey: PRODUCTS_QUERY_KEY,
		queryFn: () => getProducts(),
		staleTime: 60_000,
	});
};

export const useProductOptionsQuery = () => {
	return useQuery<ProductOption[]>({
		queryKey: [PRODUCT_OPTIONS_QUERY_KEY],
		queryFn: () => getProductOptions(),
		staleTime: 60_000,
	});
};

export const useProductOptionByIdQuery = (id: string) => {
	return useQuery<ProductOption | null>({
		queryKey: [PRODUCT_OPTIONS_QUERY_KEY, id],
		queryFn: () => getProductOptionById(id),
		staleTime: 60_000,
	});
};

export const useProductSizesQuery = (id: string) => {
	return useQuery<ProductSize[] | null>({
		queryKey: ["product-size", id],
		queryFn: () => getProductSizesByOptionId(id),
		staleTime: 60_000,
	});
};

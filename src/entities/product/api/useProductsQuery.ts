"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductImage, type Product, type ProductSize } from "@prisma/client";
import { getProductById, getProducts, getProductSizes, getProductSizesByOptionId } from "../server";

import type { ProductOption } from "@prisma/client";
import { getProductOptionById, getProductOptions } from "../server";
import { getProductImageByOptionId, getProductImages } from "../services/productImage";

export const PRODUCTS_QUERY_KEY = "products";
export const PRODUCT_QUERY_KEY = "product";
export const PRODUCT_OPTIONS_QUERY_KEY = "product-options";
export const PRODUCT_SIZE_QUERY_KEY = "product-size";
export const PRODUCT_IMAGE_QUERY_KEY = "product-image";

export const useProductsQuery = () => {
	return useQuery<Product[]>({
		queryKey: [PRODUCTS_QUERY_KEY],
		queryFn: () => getProducts(),
		staleTime: 60_000,
	});
};

export const useProductByIdQuery = (id: string) => {
	return useQuery<Product | null>({
		queryKey: [PRODUCT_QUERY_KEY, id],
		queryFn: () => getProductById(id),
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

export const useProductSizesAllQuery = () => {
	return useQuery<ProductSize[]>({
		queryKey: [PRODUCT_SIZE_QUERY_KEY],
		queryFn: () => getProductSizes(),
		staleTime: 60_000,
	});
};

export const useProductSizesQuery = (id: string) => {
	return useQuery<ProductSize[] | null>({
		queryKey: [PRODUCT_SIZE_QUERY_KEY, id],
		queryFn: () => getProductSizesByOptionId(id),
		staleTime: 60_000,
	});
};

export const useProductImagesAllQuery = () => {
	return useQuery<ProductImage[]>({
		queryKey: [PRODUCT_IMAGE_QUERY_KEY],
		queryFn: () => getProductImages(),
		staleTime: 60_000,
	});
};

export const useProductImagesQuery = (id: string) => {
	return useQuery<ProductImage[] | null>({
		queryKey: [PRODUCT_IMAGE_QUERY_KEY, id],
		queryFn: () => getProductImageByOptionId(id),
		staleTime: 60_000,
	});
};

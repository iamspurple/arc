import { useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import {
	useProductOptionsQuery,
	PRODUCT_OPTIONS_QUERY_KEY,
} from "@/entities/product/api/useProductsQuery";
import {
	getProductById,
	getProductOptionById,
	getProductSizesByOptionId,
} from "@/entities/product/server";
import type { Product } from "@prisma/client";
import { getProductImageByOptionId } from "@/entities/product/services/productImage";
import { getProductImagePublicUrl } from "@/lib/productImageUpload";

export type FormValues = {
	name: string;
	description: string;
	composition: string;
	care: string;
	options: Array<{
		id: string;
		title: string;
		price: number;
		hex: string;
		colorName: string;
		sizes: Array<{
			id: string;
			size: string;
			quantity: number;
			parameters: string;
		}>;
		images: Array<{
			id: string;
			alt: string;
			url: string;
		}>;
	}>;
};

export const useFormValues = (productId: string) => {
	const { data: product, isLoading: isProductLoading } = useQuery<Product | null>({
		queryKey: ["product", productId],
		queryFn: () => getProductById(productId),
		enabled: !!productId,
		staleTime: 60_000,
	});

	const { data: allOptions = [], isLoading: isOptionsLoading } = useProductOptionsQuery();

	const productOptions = useMemo(
		() => (productId ? allOptions.filter((option) => option.productId === productId) : []),
		[allOptions, productId]
	);

	const optionQueries = useQueries({
		queries: productOptions.map((option) => ({
			queryKey: [PRODUCT_OPTIONS_QUERY_KEY, option.id],
			queryFn: () => getProductOptionById(option.id),
			enabled: !!productId && !!option.id,
			staleTime: 60_000,
		})),
	});

	const sizeQueries = useQueries({
		queries: productOptions.map((option) => ({
			queryKey: ["product-size", option.id],
			queryFn: () => getProductSizesByOptionId(option.id),
			enabled: !!productId && !!option.id,
			staleTime: 60_000,
		})),
	});

	const imageQueries = useQueries({
		queries: productOptions.map((option) => ({
			queryKey: ["product-image", option.id],
			queryFn: () => getProductImageByOptionId(option.id),
			enabled: !!productId && !!option.id,
			staleTime: 60_000,
		})),
	});

	const formValues: FormValues | null = useMemo(() => {
		if (!productId || !product || isProductLoading || isOptionsLoading) {
			return null;
		}
		if (productOptions.length > 0 && imageQueries.some((q) => q.isLoading)) {
			return null;
		}

		const options = productOptions.map((option, index) => {
			const optionData = optionQueries[index]?.data;
			const sizesData = sizeQueries[index]?.data || [];
			const imagesData = imageQueries[index]?.data || [];

			return {
				id: option.id,
				title: optionData?.title || option.title,
				price: optionData?.price || option.price,
				hex: optionData?.hex || option.hex,
				colorName: optionData?.colorName || option.colorName,
				sizes: sizesData.map((size) => ({
					id: size.id,
					size: size.size,
					quantity: size.quantity,
					parameters: size.parameters,
				})),
				images: imagesData.map((image) => ({
					id: image.id,
					alt: image.alt,
					url: getProductImagePublicUrl(image.id),
				})),
			};
		});

		return {
			name: product.name,
			description: product.description,
			composition: product.composition,
			care: product.care,
			options,
		};
	}, [
		productId,
		product,
		isProductLoading,
		isOptionsLoading,
		productOptions,
		optionQueries,
		sizeQueries,
		imageQueries,
	]);

	const isLoading =
		isProductLoading ||
		isOptionsLoading ||
		optionQueries.some((query) => query.isLoading) ||
		sizeQueries.some((query) => query.isLoading) ||
		imageQueries.some((query) => query.isLoading);

	return {
		formValues,
		isLoading,
	};
};

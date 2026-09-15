import type {
	ProductOptionUpdateEntity,
	ProductSizeUpdateEntity,
	ProductSizeCreateEntity,
	ProductOptionCreateEntity,
	ProductImageCreateEntity,
} from "@/entities/product";
import {
	deleteProductOptionById,
	updateProductOptionById,
	deleteProductSizeById,
	updateProductSizeById,
	createProductSize,
	createProductOption,
	createProductImages,
	deleteProductImageById,
} from "@/entities/product/server";
import { createSizeOrder } from ".";
import { createSlug } from "./slug";

import { useQueryClient } from "@tanstack/react-query";
import {
	PRODUCT_SIZE_QUERY_KEY,
	PRODUCT_IMAGE_QUERY_KEY,
} from "@/entities/product/api/useProductsQuery";

import type { Step2Props, FormData, ImgInitialType } from "@/components/Dashboard/ModalForm/Step2";

export const useSubmitHandlers = (
	productId: string,
	productName: string,
	files: Record<string, ImgInitialType[]>
) => {
	const queryClient = useQueryClient();

	const handleUpdateSubmit = async (initialValues: Step2Props["initialValues"], data: FormData) => {
		const existingOptionIds = initialValues?.options.map((opt) => opt.id) || [];

		const formOptionIds = data.options
			.map((opt) => ("id" in opt ? opt.id : undefined))
			.filter((id): id is string => !!id);
		for (const existingId of existingOptionIds) {
			if (!formOptionIds.some((optionId) => optionId === existingId)) {
				try {
					await deleteProductOptionById(existingId);
				} catch (error) {
					console.error(`Не удалось удалить опцию ${existingId}:`, error);
				}
			}
		}

		for (const option of data.options) {
			if (option.id) {
				const optionPayload: ProductOptionUpdateEntity = {
					id: option.id,
					title: option.title,
					slug: createSlug(`${productName}-${option.title}`),
					price: option.price,
					colorName: option.colorName,
					hex: option.hex,
					productId,
				};

				await updateProductOptionById(optionPayload);

				const existingSizesForOption =
					initialValues?.options
						.find((opt) => opt.id === option.id)
						?.sizes.map((size) => size.id) || [];
				const formSizesForOption = (option.sizes || [])
					.map((size) => ("id" in size ? size.id : undefined))
					.filter((id): id is string => !!id);
				for (const existingSizeId of existingSizesForOption) {
					if (!formSizesForOption.some((sizeId) => sizeId === existingSizeId)) {
						try {
							await deleteProductSizeById(existingSizeId);
						} catch (error) {
							console.error(`Не удалось удалить размер ${existingSizeId}:`, error);
						}
					}
				}

				for (const size of option.sizes || []) {
					if (size.id) {
						const sizePayload: ProductSizeUpdateEntity = {
							id: size.id,
							order: createSizeOrder(size.size),
							size: size.size,
							quantity: size.quantity,
							parameters: size.parameters,
							optionId: option.id,
						};
						await updateProductSizeById(sizePayload);
					} else {
						const sizePayload: ProductSizeCreateEntity = {
							order: createSizeOrder(size.size),
							size: size.size,
							quantity: size.quantity,
							parameters: size.parameters,
							optionId: option.id,
						};
						await createProductSize(sizePayload);
					}
				}

				const images: ImgInitialType[] = files[option.fieldKey] || [];

				const existingImagesForOption =
					initialValues?.options
						.find((opt) => opt.id === option.id)
						?.images.map((image) => image.id) || [];

				const formImagesForOption = (images || [])
					.map((img) => ("id" in img ? img.id : undefined))
					.filter((id): id is string => !!id);
				for (const existingImageId of existingImagesForOption) {
					if (!formImagesForOption.some((imageId) => imageId === existingImageId)) {
						try {
							await deleteProductImageById(existingImageId);
						} catch (error) {
							console.error(`Не удалось удалить изображение ${existingImageId}:`, error);
						}
					}
				}

				const filtered: ProductImageCreateEntity[] = images
					.filter((img) => img.trigger === "new" && img.file)
					.map((img) => ({
						alt: option.title,
						optionId: option.id!,
						fileObj: img.file!,
					}));

				await createProductImages(filtered);

				queryClient.invalidateQueries({ queryKey: [PRODUCT_IMAGE_QUERY_KEY, option.id] });
				queryClient.invalidateQueries({ queryKey: [PRODUCT_SIZE_QUERY_KEY, option.id] });
			} else {
				const optionPayload: ProductOptionCreateEntity = {
					title: option.title,
					slug: createSlug(`${productName}-${option.title}`),
					price: option.price,
					colorName: option.colorName,
					hex: option.hex,
					productId,
				};

				const result = await createProductOption(optionPayload);

				for (const size of option.sizes || []) {
					const sizePayload: ProductSizeCreateEntity = {
						order: createSizeOrder(size.size),
						size: size.size,
						quantity: size.quantity,
						parameters: size.parameters,
						optionId: result.id,
					};
					await createProductSize(sizePayload);
				}

				const images: ImgInitialType[] = files[option.fieldKey] || [];

				const filtered: ProductImageCreateEntity[] = images
					.filter((img) => img.trigger === "new" && img.file)
					.map((img) => ({
						alt: option.title,
						optionId: result.id,
						fileObj: img.file!,
					}));

				await createProductImages(filtered);

				queryClient.invalidateQueries({ queryKey: [PRODUCT_IMAGE_QUERY_KEY, result.id] });
				queryClient.invalidateQueries({ queryKey: [PRODUCT_SIZE_QUERY_KEY, result.id] });
			}
		}
	};

	const handleCreateSubmit = async (data: FormData) => {
		for (const option of data.options) {
			const images: ImgInitialType[] = files[option.fieldKey] || [];

			const optionPayload: ProductOptionCreateEntity = {
				title: option.title,
				slug: createSlug(`${productName}-${option.title}`),
				price: option.price,
				colorName: option.colorName,
				hex: option.hex,
				productId,
			};

			const result = await createProductOption(optionPayload);

			const filtered = images
				.filter((img) => img.trigger === "new" && img.file)
				.map((img) => ({
					alt: option.title,
					optionId: result.id,
					fileObj: img.file!,
				}));

			await createProductImages(filtered);

			for (const size of option.sizes || []) {
				const sizePayload: ProductSizeCreateEntity = {
					order: createSizeOrder(size.size),
					size: size.size,
					quantity: size.quantity,
					parameters: size.parameters,
					optionId: result.id,
				};

				await createProductSize(sizePayload);
			}
			queryClient.invalidateQueries({ queryKey: [PRODUCT_IMAGE_QUERY_KEY, result.id] });
			queryClient.invalidateQueries({ queryKey: [PRODUCT_SIZE_QUERY_KEY, result.id] });
		}
	};

	return {
		handleCreateSubmit,
		handleUpdateSubmit,
	};
};

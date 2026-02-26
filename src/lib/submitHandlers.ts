import type {
	ProductOptionUpdateEntity,
	ProductSizeUpdateEntity,
	ProductSizeCreateEntity,
	ProductOptionCreateEntity,
} from "@/entities/product";
import {
	deleteProductOptionById,
	updateProductOptionById,
	deleteProductSizeById,
	updateProductSizeById,
	createProductSize,
	createProductOption,
	createProductImages,
} from "@/entities/product/server";
import { createOrder } from ".";
import { createSlug } from "./slug";

import type { Step2Props, FormData } from "@/components/Dashboard/ModalForm/Step2";
import { UploadFile } from "antd";

export const submitHandlers = (data: FormData, productId: string) => {
	const handleUpdateSubmit = async (initialValues: Step2Props["initialValues"]) => {
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
			if ("id" in option && option.id) {
				const optionPayload: ProductOptionUpdateEntity = {
					id: option.id,
					title: option.title,
					slug: createSlug(option.title),
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
					if ("id" in size && size.id) {
						const sizePayload: ProductSizeUpdateEntity = {
							id: size.id,
							order: createOrder(size.size),
							size: size.size,
							quantity: size.quantity,
							parameters: size.parameters,
							optionId: option.id,
						};
						await updateProductSizeById(sizePayload);
					} else {
						const sizePayload: ProductSizeCreateEntity = {
							order: createOrder(size.size),
							size: size.size,
							quantity: size.quantity,
							parameters: size.parameters,
							optionId: option.id,
						};
						await createProductSize(sizePayload);
					}
				}
			} else {
				const optionPayload: ProductOptionCreateEntity = {
					title: option.title,
					slug: createSlug(option.title),
					price: option.price,
					colorName: option.colorName,
					hex: option.hex,
					productId,
				};

				const result = await createProductOption(optionPayload);

				for (const size of option.sizes || []) {
					const sizePayload: ProductSizeCreateEntity = {
						order: createOrder(size.size),
						size: size.size,
						quantity: size.quantity,
						parameters: size.parameters,
						optionId: result.id,
					};
					await createProductSize(sizePayload);
				}
			}
		}
	};

	const handleCreateSubmit = async () => {
		for (const option of data.options) {
			let images: File[] = [];

			const optionPayload: ProductOptionCreateEntity = {
				title: option.title,
				slug: createSlug(option.title),
				price: option.price,
				colorName: option.colorName,
				hex: option.hex,
				productId,
			};

			const result = await createProductOption(optionPayload);

			if ("images" in option && Array.isArray(option.images)) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				images = option.images.map<File>((img: UploadFile) => img.originFileObj);
			}

			console.log("foo", images[0]);
			await createProductImages(images.map(img => ({
				alt: '',
				optionId: result.id,
				fileObj: img
			})));

			for (const size of option.sizes || []) {
				const sizePayload: ProductSizeCreateEntity = {
					order: createOrder(size.size),
					size: size.size,
					quantity: size.quantity,
					parameters: size.parameters,
					optionId: result.id,
				};

				await createProductSize(sizePayload);
			}
			images = []
		}
	};

	return {
		handleCreateSubmit,
		handleUpdateSubmit,
	};
};

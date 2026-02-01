import { useState } from "react";

import { nanoid } from "nanoid";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

import { useDashboardData } from "@/context/DashboardContext";
import { PRODUCT_OPTIONS_QUERY_KEY } from "@/entities/product/api/useProductsQuery";

import type { ProductOptionCreateEntity, ProductSizeCreateEntity } from "@/entities/product";
import type { FormData } from "@/components/Dashboard/ModalForm/Step2";

import { createProductOption, createProductSize } from "@/entities/product/server";
import { createSlug } from "@/lib/slug";
import { createOrder } from ".";

type optionFormType = {
	id: string;
	complete: boolean;
	size: string[];
};

export const useOptionForm = () => {
	const queryClient = useQueryClient();

	const { productId } = useDashboardData();

	const [optionFormList, setOptionFormList] = useState<optionFormType[]>(() => [
		{ id: nanoid(8), complete: false, size: [nanoid(6)] },
	]);

	const addOptionForm = () => {
		const newOptionFormList = optionFormList.map((form) => ({ ...form, complete: true }));
		setOptionFormList([
			...newOptionFormList,
			{ id: nanoid(8), complete: false, size: [nanoid(6)] },
		]);
	};
	const deleteOptionForm = (id: string) => {
		const newOptionFormList = optionFormList.filter((form) => form.id !== id);
		setOptionFormList([...newOptionFormList]);
	};

	const addSizeForm = (optionId: string) => {
		const newOptionFormList = optionFormList.map((form) => {
			if (form.id === optionId) {
				return { ...form, size: [...form.size, nanoid(6)] };
			}
			return form;
		});
		setOptionFormList(newOptionFormList);
	};

	const deleteSizeForm = (optionId: string, sizeId: string) => {
		const newOptionFormList = optionFormList.map((form) => {
			if (form.id === optionId) {
				return { ...form, size: form.size.filter((size) => size !== sizeId) };
			}
			return form;
		});
		setOptionFormList(newOptionFormList);
	};

	const onSubmit = async (data: FormData) => {
		try {
			for (const [index, form] of optionFormList.entries()) {
				const optionPayload: ProductOptionCreateEntity = {
					title: data[`title_${form.id}`] as string,
					slug: createSlug(data[`title_${form.id}`] as string),
					price: data[`price_${form.id}`] as number,
					colorName: data[`colorName_${form.id}`] as string,
					hex: data[`hex_${form.id}`] as string,
					productId,
				};

				const result = await createProductOption(optionPayload);

				const sizePayload: ProductSizeCreateEntity = {
					order: createOrder(data[`size_${form.id}_${index}`] as string),
					size: data[`size_${form.id}_${index}`] as string,
					quantity: data[`quantity_${form.id}_${index}`] as number,
					parameters: data[`parameters_${form.id}_${index}`] as string,
					optionId: result.id,
				};

				await createProductSize(sizePayload);
			}
			await queryClient.invalidateQueries({ queryKey: PRODUCT_OPTIONS_QUERY_KEY });

			message.success("Модель и варианты успешно созданы");
		} catch (e) {
			console.error(e);
			message.error("Не удалось создать вариант");
		}
	};

	return {
		optionFormList,
		addOptionForm,
		deleteOptionForm,
		addSizeForm,
		deleteSizeForm,
		onSubmit,
	};
};

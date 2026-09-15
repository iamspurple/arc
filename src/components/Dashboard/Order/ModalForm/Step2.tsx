import { Form, Input, Typography, Listy, Button, message } from "antd";
import { useState, useMemo, useEffect } from "react";
import type { ChangeEvent } from "react";

import {
	useProductOptionsQuery,
	useProductsQuery,
	useProductImagesAllQuery,
	useProductSizesAllQuery,
} from "@/entities/product/api/useProductsQuery";
import { OptionForm } from "./OptionForm";
import { DropdownList } from "./DropdownList";
import styles from "./Step2.module.scss";

import { useSubmitHandlers } from "@/lib/order/submitHandlers";

import type { FormValues } from "@/lib/useOrderFormValues";
import { OrderProductOptionCreateEntity } from "@/entities/order/types/order";

import { useQueryClient } from "@tanstack/react-query";

import { ORDER_PRODUCT_OPTIONS_QUERY_KEY } from "@/entities/order/api/useOrdersQuery";

export interface Option {
	id: string;
	productName: string;
	optionName: string;
	article: string;
	image: string;
}

type FormOptions = Omit<OrderProductOptionCreateEntity, "orderId"> & { id?: string };

export type FormData = {
	options: FormOptions[];
};

export type Step2Props = {
	orderId: string;
	isEditMode: boolean;
	initialValues: Pick<FormValues, "options"> | undefined;
	handleClose: () => void;
};

export const Step2 = (props: Step2Props) => {
	const { orderId, isEditMode, initialValues, handleClose } = props;

	const queryClient = useQueryClient();

	const [search, setSearch] = useState("");
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	const [form] = Form.useForm();

	const { data: products } = useProductsQuery();
	const { data: options, isLoading, isError } = useProductOptionsQuery();
	const { data: images } = useProductImagesAllQuery();
	const { data: sizes } = useProductSizesAllQuery();

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

	const filteredItems = useMemo(() => {
		const query = search.trim().toLowerCase();
		if (!query) return [];
		return (
			items?.filter((item) =>
				[item.productName, item.optionName, item.article]
					.filter(Boolean)
					.some((value) => value.toLowerCase().includes(query))
			) ?? []
		);
	}, [items, search]);

	const { handleCreateSubmit, handleUpdateSubmit } = useSubmitHandlers(orderId);

	const handleSubmit = async (data: FormData) => {
		try {
			if (isEditMode && orderId) {
				await handleUpdateSubmit(data, initialValues);
				setTimeout(() => {
					handleClose();
					message.success("Позиции в заказе успешно обновлены");
				}, 1500);
			} else {
				await handleCreateSubmit(data);
				setTimeout(() => {
					handleClose();
					message.success("Позиции в заказе успешно сохранены");
				}, 1500);
			}
			queryClient.invalidateQueries({ queryKey: [ORDER_PRODUCT_OPTIONS_QUERY_KEY] });
		} catch {
			message.error(
				isEditMode
					? "Не удалось обновить позиции в заказе"
					: "Не удалось сохранить позиции в заказе"
			);
		}
	};

	const defaultValues: Pick<FormValues, "options"> = useMemo(() => {
		return { options: [] };
	}, []);

	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue(initialValues);
		} else {
			form.setFieldsValue(defaultValues);
		}
	}, [form, initialValues, defaultValues]);

	return (
		<div className={styles.step}>
			<Form form={form} className={styles.form} onFinish={handleSubmit}>
				<Form.List name="options">
					{(fields, { add, remove }) => (
						<div className={styles.step}>
							<div className={styles.search}>
								<Input
									placeholder="Введите название или артикул товара"
									value={search}
									onChange={handleSearch}
									allowClear
								/>
								{search.trim() && (
									<div className={styles.dropdown}>
										{filteredItems.length ? (
											<Listy<Option>
												rowKey="id"
												virtual={false}
												items={filteredItems}
												itemRender={(item) => (
													<DropdownList
														item={item}
														add={(obj) => {
															add(obj);
															setSearch("");
														}}
													/>
												)}
											/>
										) : (
											<div className={styles.dropdownEmpty}>Ничего не найдено</div>
										)}
									</div>
								)}
							</div>

							<Typography.Title level={4}>Позиции:</Typography.Title>
							<div className={styles.positions}>
								{fields.map((field, index) => (
									<OptionForm
										key={field.key}
										optionField={field}
										form={form}
										remove={remove}
										items={items}
										allSizes={sizes}
										index={index}
									/>
								))}
							</div>
						</div>
					)}
				</Form.List>
				<Button type="primary" htmlType="submit" className={styles.button}>
					Сохранить
				</Button>
			</Form>
		</div>
	);
};

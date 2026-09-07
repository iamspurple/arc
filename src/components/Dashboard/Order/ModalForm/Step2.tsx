import { Form, Input, Typography, Listy, Button, message } from "antd";
import { useState, useMemo } from "react";
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

export interface Option {
	id: string;
	productName: string;
	optionName: string;
	article: string;
	image: string;
}

export type FormData = {
	options: {
		optionId: string;
		sizeId: string;
		quantity: number;
	}[];
};

export const Step2 = (orderId: { orderId: string }) => {
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
				image: images?.filter((image) => image.optionId === option.id)[0].id as string,
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

	const { handleCreateSubmit } = useSubmitHandlers(orderId);

	const handleSubmit = async (data: FormData) => {
		try {
			await handleCreateSubmit(data);
			message.success("Позиции в заказе сохранены");
		} catch {
			message.error("Не удалось сохранить позиции в заказе");
		}
	};

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

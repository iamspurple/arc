import { Form, Input, Image, Listy, Flex, Typography } from "antd";
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

export interface Option {
	id: string;
	productName: string;
	optionName: string;
	article: string;
	image: string;
}

export const Step2 = () => {
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

	return (
		<div>
			<Form form={form}>
				<Form.List name="options">
					{(fields, { add, remove }) => (
						<>
							<Input placeholder="Введите название или артикул товара" onChange={handleSearch} />
							<Listy<Option>
								style={{ opacity: search ? 1 : 0 }}
								rowKey="id"
								items={items}
								itemRender={(item) => <DropdownList item={item} add={add} />}
							/>
							<Typography.Title level={4}> Позиции:</Typography.Title>
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
						</>
					)}
				</Form.List>
			</Form>
		</div>
	);
};

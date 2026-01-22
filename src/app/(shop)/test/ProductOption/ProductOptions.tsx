"use client";
import { ProductOption } from "@prisma/client";
import { useState } from "react";
import { CreateProductOptionBtn } from "./CreateProductOptionBtn";
import { RemoveProductOptionBtn } from "./RemoveProductOptionBtn";
import { ChangeProductOptionBtn } from "./ChangeProductOptionBtn";

export const ProductOptions = ({ data }: { data: ProductOption[] }) => {
	const [productOptions, setProductOptions] = useState(data);

	const addNewProductOption = (productOption: ProductOption) => {
		setProductOptions((prev) => [...prev, productOption]);
	};

	const removeProductOption = (productOptionId: string) => {
		setProductOptions((prevState) => prevState.filter((p) => p.id !== productOptionId));
	};

	const updateProductOption = (updatedProductOption: ProductOption) => {
		setProductOptions((prevState) => {
			return prevState.map((p) => {
				if (p.id === updatedProductOption.id) {
					return {
						...updatedProductOption,
					};
				}
				return p;
			});
		});
	};

	return (
		<div>
			<h3>Список опций продуктов</h3>
			<CreateProductOptionBtn addNewProductOption={addNewProductOption} />
			{productOptions.map((productOption) => (
				<div key={productOption.id}>
					<pre>{JSON.stringify(productOption, null, 2)}</pre>
					<RemoveProductOptionBtn
						productOptionId={productOption.id}
						removeProductOption={removeProductOption}
					/>
					<ChangeProductOptionBtn
						productOption={{
							id: productOption.id,
							title: productOption.title + " updated",
							slug: productOption.slug + " updated",
							price: productOption.price * 3,
							hex: productOption.hex + " up",
							colorName: productOption.colorName + " updated",
							productId: "cmkivr2350000vadkb6v4djk7",
						}}
						updateProductOption={updateProductOption}
					/>
				</div>
			))}
		</div>
	);
};

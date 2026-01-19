"use client";
import { ProductSize } from "@prisma/client";
import { useState } from "react";
import { CreateProductSizeBtn } from "./CreateProductSizeBtn";
import { RemoveProductSizeBtn } from "./RemoveProductSizeBtn";
import { ChangeProductSizeBtn } from "./ChangeProductSizeBtn";

export const ProductSizes = ({ data }: { data: ProductSize[] }) => {
	const [productSizes, setProductSizes] = useState(data);

	const addNewProductSize = (productSize: ProductSize) => {
		setProductSizes((prev) => [...prev, productSize]);
	};

	const removeProductSize = (productSizeId: string) => {
		setProductSizes((prevState) => prevState.filter((p) => p.id !== productSizeId));
	};

	const updateProductSize = (updatedProductSize: ProductSize) => {
		setProductSizes((prevState) => {
			return prevState.map((p) => {
				if (p.id === updatedProductSize.id) {
					return {
						...updatedProductSize,
					};
				}
				return p;
			});
		});
	};

	return (
		<div>
			<h3>Список размеров продуктов</h3>
			<CreateProductSizeBtn addNewProductSize={addNewProductSize} />
			{productSizes.map((productSize) => (
				<div key={productSize.id}>
					<pre>{JSON.stringify(productSize, null, 2)}</pre>
					<RemoveProductSizeBtn
						productSizeId={productSize.id}
						removeProductSize={removeProductSize}
					/>
					<ChangeProductSizeBtn
						productSize={{
							id: productSize.id,
							order: productSize.order + 5,
							size: "M",
							quantity: productSize.quantity * 5,
							parameters: productSize.parameters + " updated",
							optionId: "cmkivt5k90004vadkz4unsmqd",
						}}
						updateProductSize={updateProductSize}
					/>
				</div>
			))}
		</div>
	);
};

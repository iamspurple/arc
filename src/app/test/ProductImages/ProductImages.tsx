"use client";
import { ProductImage } from "@prisma/client";
import { useState } from "react";
import { CreateProductImageBtn } from "./CreateProductImageBtn";
import { RemoveProductImageBtn } from "./RemoveProductImageBtn";
import { ChangeProductImageBtn } from "./ChangeProductImageBtn";

export const ProductImages = ({ data }: { data: ProductImage[] }) => {
	const [productImages, setProductImages] = useState(data);

	const addNewProductImage = (productImage: ProductImage) => {
		setProductImages((prev) => [...prev, productImage]);
	};

	const removeProductImage = (productImageId: string) => {
		setProductImages((prevState) => prevState.filter((p) => p.id !== productImageId));
	};

	const updateProductImage = (updatedProductImage: ProductImage) => {
		setProductImages((prevState) => {
			return prevState.map((p) => {
				if (p.id === updatedProductImage.id) {
					return {
						...updatedProductImage,
					};
				}
				return p;
			});
		});
	};

	return (
		<div>
			<h3>Список изображений продуктов</h3>
			<CreateProductImageBtn addNewProductImage={addNewProductImage} />
			{productImages.map((productImage) => (
				<div key={productImage.id}>
					<pre>{JSON.stringify(productImage, null, 2)}</pre>
					<RemoveProductImageBtn
						productImageId={productImage.id}
						removeProductImage={removeProductImage}
					/>
					<ChangeProductImageBtn
						productImage={{
							id: productImage.id,
							alt: "альтернативный текст updated",
							optionId: "cmkivt5k90004vadkz4unsmqd",
						}}
						updateProductImage={updateProductImage}
					/>
				</div>
			))}
		</div>
	);
};

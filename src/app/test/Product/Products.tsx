"use client";
import { Product } from "@prisma/client";
import { useState } from "react";
import { CreateProductBtn } from "@/app/test/Product/CreateProductBtn";
import { RemoveProductBtn } from "@/app/test/Product/RemoveProductBtn";
import { ChangeProductBtn } from "./ChangeProductBtn";

export const Products = ({data}: {data: Product[]}) => {
	const [products, setProducts] = useState(data);

	const addNewProduct = (product: Product) => {
		setProducts((prev) => [...prev, product]);
	}

	const removeProduct = (productId: string) => {
		setProducts((prevState) => prevState.filter((p) => p.id !== productId));
	}

	const updateProduct = (updatedProduct:  Product) => {
		setProducts(prevState => {
			return prevState
				.map((p) => {
					if (p.id === updatedProduct.id) {
						return {
							...updatedProduct
						}
					}
					return p
				})
		});
	};
	
	return (
		<div>
			<h3>Список продуктов</h3>
			<CreateProductBtn addNewProduct={addNewProduct} />
			{products.map((product) => (
				<div key={product.id}>
					<pre>{JSON.stringify(product, null, 2)}</pre>
					<RemoveProductBtn productId={product.id} removeProduct={removeProduct} />
					<ChangeProductBtn
						product={{
							id: product.id,
							description: product.description + " updated",
							care: product.care + " updated",
							composition: product.composition + " updated",
						}}
						updateProduct={updateProduct}
					/>
				</div>
			))}
		</div>
	);
}
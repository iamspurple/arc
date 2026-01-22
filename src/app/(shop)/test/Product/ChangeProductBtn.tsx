import { updateProductById } from "@/entities/product/server";
import { type ProductUpdateEntity } from "@/entities/product";
import { Product } from "@prisma/client";

export const ChangeProductBtn = ({
	product,
	updateProduct,
}: {
	product: ProductUpdateEntity;
	updateProduct: (product: Product) => void;
}) => {
	const deleteProductBtn = async () => {
		try {
			const newProduct = await updateProductById(product);
			updateProduct(newProduct);
		} catch (e) {}
	};

	return <button onClick={deleteProductBtn}>обновить продукт</button>;
};

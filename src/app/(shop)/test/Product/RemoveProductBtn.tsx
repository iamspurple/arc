import { deleteProductById } from "@/entities/product/server";

export const RemoveProductBtn = ({
	productId,
	removeProduct
}: {
	productId: string,
	removeProduct: (productId: string) => void,
}) => {
	const deleteProductBtn = async () => {
		try {
			await deleteProductById(productId);
			removeProduct(productId)
		} catch (e) {

		}
	}

	return (
		<button
			onClick={deleteProductBtn}
		>
			удалить продукт
		</button>
	);
}
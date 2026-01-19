import { deleteProductSizeById } from "@/entities/product/server";

export const RemoveProductSizeBtn = ({
	productSizeId,
	removeProductSize,
}: {
	productSizeId: string;
	removeProductSize: (productOptionId: string) => void;
}) => {
	const deleteProductBtn = async () => {
		try {
			await deleteProductSizeById(productSizeId);
			removeProductSize(productSizeId);
		} catch (e) {}
	};

	return <button onClick={deleteProductBtn}>удалить размер продукта</button>;
};

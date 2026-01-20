import { deleteProductImageById } from "@/entities/product/server";

export const RemoveProductImageBtn = ({
	productImageId,
	removeProductImage,
}: {
	productImageId: string;
	removeProductImage: (productImageId: string) => void;
}) => {
	const deleteProductImageBtn = async () => {
		try {
			await deleteProductImageById(productImageId);
			removeProductImage(productImageId);
		} catch (e) {}
	};

	return <button onClick={deleteProductImageBtn}>удалить изображение продукта</button>;
};

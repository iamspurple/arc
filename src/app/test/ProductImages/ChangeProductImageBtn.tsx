import { type ProductImageUpdateEntity } from "@/entities/product";
import { ProductImage } from "@prisma/client";
import { updateProductImageById } from "@/entities/product/server";

export const ChangeProductImageBtn = ({
	productImage,
	updateProductImage,
}: {
	productImage: ProductImageUpdateEntity;
	updateProductImage: (productImage: ProductImage) => void;
}) => {
	const changeProductImageBtn = async () => {
		try {
			const newProductImage = await updateProductImageById(productImage);
			updateProductImage(newProductImage);
		} catch (e) {}
	};

	return <button onClick={changeProductImageBtn}>Изменить изображение продукта</button>;
};

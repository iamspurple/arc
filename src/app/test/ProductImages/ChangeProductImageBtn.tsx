import { ProductImageUpdateEntity } from "@/entities/product/types/product";
import { ProductImage } from "@prisma/client";
import { updateProductImageById } from "@/entities/product/services/productImage";

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

import { type ProductSizeUpdateEntity } from "@/entities/product";
import { ProductSize } from "@prisma/client";
import { updateProductSizeById } from "@/entities/product/server";

export const ChangeProductSizeBtn = ({
	productSize,
	updateProductSize,
}: {
	productSize: ProductSizeUpdateEntity;
	updateProductSize: (productSize: ProductSize) => void;
}) => {
	const changeProductSizeBtn = async () => {
		try {
			const newProductSize = await updateProductSizeById(productSize);
			updateProductSize(newProductSize);
		} catch (e) {}
	};

	return <button onClick={changeProductSizeBtn}>Изменить размер продукта</button>;
};

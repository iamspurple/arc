import { type ProductOptionUpdateEntity } from "@/entities/product";
import { ProductOption } from "@prisma/client";
import { updateProductOptionById } from "@/entities/product/server";

export const ChangeProductOptionBtn = ({
	productOption,
	updateProductOption,
}: {
	productOption: ProductOptionUpdateEntity;
	updateProductOption: (product: ProductOption) => void;
}) => {
	const deleteProductBtn = async () => {
		try {
			const newProduct = await updateProductOptionById(productOption);
			updateProductOption(newProduct);
		} catch (e) {}
	};

	return <button onClick={deleteProductBtn}>обновить опции продукта</button>;
};

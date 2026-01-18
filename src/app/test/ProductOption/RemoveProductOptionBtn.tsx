import { deleteProductOptionById } from "@/entities/product/services/productOption";

export const RemoveProductOptionBtn = ({
	productOptionId,
	removeProductOption,
}: {
	productOptionId: string;
	removeProductOption: (productOptionId: string) => void;
}) => {
	const deleteProductBtn = async () => {
		try {
			await deleteProductOptionById(productOptionId);
			removeProductOption(productOptionId);
		} catch (e) {}
	};

	return <button onClick={deleteProductBtn}>удалить опцию продукта</button>;
};

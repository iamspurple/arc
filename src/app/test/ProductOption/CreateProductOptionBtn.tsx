import { ProductOption } from "@prisma/client";
import { createProductOption } from "@/entities/product/server";

export const CreateProductOptionBtn = ({
	addNewProductOption,
}: {
	addNewProductOption: (productOption: ProductOption) => void;
}) => {
	const create = async () => {
		try {
			const result = await createProductOption({
				title: "Описание опции " + new Date(),
				slug: "Slug опции",
				price: 10,
				hex: "3f3f3f",
				colorName: "Белый",
				productId: "cmkivr2350000vadkb6v4djk7",
			});
			addNewProductOption(result);
		} catch (error) {
			console.log(error);
		}
	};

	return <button onClick={create}>Создать опцию продукта</button>;
};

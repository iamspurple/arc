import { ProductSize } from "@prisma/client";
import { createProductSize } from "@/entities/product/server";

export const CreateProductSizeBtn = ({
	addNewProductSize,
}: {
	addNewProductSize: (productSize: ProductSize) => void;
}) => {
	const create = async () => {
		try {
			const result = await createProductSize({
				order: 1,
				size: "S",
				quantity: 1,
				parameters: "Параметр размера",
				optionId: "cmkivt5k90004vadkz4unsmqd",
			});
			addNewProductSize(result);
		} catch (error) {
			console.log(error);
		}
	};

	return <button onClick={create}>Создать размер продукта</button>;
};

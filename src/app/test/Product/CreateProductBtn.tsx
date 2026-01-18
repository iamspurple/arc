import { Product } from "@prisma/client";
import {createProduct} from "@/entities/product/services/product";

export const CreateProductBtn = ({
	addNewProduct
}: {
	addNewProduct: (product: Product) => void
}) => {
	const create = async () => {
		try {
			const result = await createProduct({
				description: "Описание товар " + new Date(),
				care: "Care товара1",
				composition: "Composition товара"
			});
			addNewProduct(result);
		} catch (error) {
			console.log(error);
		}
	};

	return <button onClick={create}>Создать продукт</button>;
}
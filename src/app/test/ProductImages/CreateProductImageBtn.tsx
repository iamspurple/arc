import { ProductImage } from "@prisma/client";
import { createProductImage } from "@/entities/product/server";

export const CreateProductImageBtn = ({
	addNewProductImage,
}: {
	addNewProductImage: (productImage: ProductImage) => void;
}) => {
	const create = async () => {
		try {
			const result = await createProductImage({
				alt: "Альтренативный текст изображения",
				optionId: "cmkivt5k90004vadkz4unsmqd",
			});
			addNewProductImage(result);
		} catch (error) {
			console.log(error);
		}
	};

	return <button onClick={create}>Создать изображение продукта</button>;
};

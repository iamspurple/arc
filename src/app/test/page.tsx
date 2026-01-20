import {
	getProducts,
	getProductOptions,
	getProductSizes,
	getProductImages
} from "@/entities/product/server";
import { Products } from "./Product/Products";
import { ProductOptions } from "./ProductOption/ProductOptions";
import { ProductSizes } from "./ProductSizes/ProductSizes";
import { ProductImages } from "./ProductImages/ProductImages";

const Test = async () => {
	const productData = await getProducts();
	const productOptionsData = await getProductOptions();
	const productSizesData = await getProductSizes()
	const productImagesData = await getProductImages()

	return (
		<div>
			<h1>Тестирование методов</h1>
			<Products data={productData} />
			<ProductOptions data={productOptionsData} />
			<ProductSizes data={productSizesData} />
			<ProductImages data={productImagesData} />
		</div>
	);
}

export default Test;
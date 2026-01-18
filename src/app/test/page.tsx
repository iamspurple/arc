import {
	getProducts
} from "@/entities/product/services/product";
import { getProductOptions } from "@/entities/product/services/productOption";
import { getProductSizes } from "@/entities/product/services/productSize";
import { Products } from "./Product/Products";
import { ProductOptions } from "./ProductOption/ProductOptions";
import { ProductSizes } from "@/app/test/ProductSizes/ProductSizes";
import { ProductImages } from "@/app/test/ProductImages/ProductImages";
import { getProductImages } from "@/entities/product/services/productImage";

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
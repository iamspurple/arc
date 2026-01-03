import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import "./product.scss";
import SizePicker from "@/components/SizePicker/SizePicker";
import DescriptionPicker from "@/components/DescriptionPicker/DescriptionPicker";

import ImagePicker from "@/components/ImagePicker/ImagePicker";

type Params = {
	params: Promise<{ id: string }>;
};

async function getProduct(slug: string) {
	const product = await prisma.product.findUnique({
		where: { slug },
		include: { images: true },
	});

	return product;
}

const ProductPage = async ({ params }: Params) => {
	const { id: slug } = await params;
	const product = await getProduct(slug);

	if (!product) {
		notFound();
	}

	return (
		<div className="product-page">
			<div className="content">
				<ImagePicker images={product.images} title={product.title} />

				<div className="info">
					<div className="info-container">
						<h1 className="title">{product.title}</h1>

						<span className="price">{product.price}</span>
					</div>

					<div className="info-container">
						<SizePicker sizes={product.sizes} />
						<button className="button" disabled={!product.inStock}>
							{product.inStock ? "Добавить в корзину" : "Нет в наличии"}
						</button>
					</div>

					<DescriptionPicker
						description={product.description}
						composition={product.composition}
						care={product.care}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;

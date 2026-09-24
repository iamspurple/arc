import { ImagePicker } from "@/components/ImagePicker";
import DescriptionPicker from "@/components/DescriptionPicker/DescriptionPicker";

import ProductActions from "@/components/ProductActions/ProductActions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import style from "./product.module.scss";

import { formatPrice } from "@/lib";

type Params = {
	params: Promise<{ id: string }>;
};

// TODO используем только из entities
// async function getProduct(slug: string) {
// 	const product = await prisma.product.findUnique({
// 		where: { slug },
// 		include: { images: true },
// 	});
//
// 	return product;
// }

const ProductPage = async ({ params }: Params) => {
	const { id: slug } = await params;
	// const product = await getProduct(slug);

	// if (!product) {
	// 	notFound();
	// }

	return (
		<div className={style.product_page}>
			<div className={style.content}>
				{/*<ImagePicker images={product.images} title={product.description} />*/}

				<div className={style.info}>
					<div className={style.info_container}>
						{/*TODO*/}
						{/*<h1 className={style.title}>{product.description}</h1>*/}

						{/*TODO*/}
						{/*<span className={style.price}>{formatPrice(product.price)}</span>*/}
					</div>

					{/*TODO*/}
					{/*<ProductActions product={product} />*/}

					{/*TODO*/}
					{/*<DescriptionPicker*/}
					{/*	description={product.description}*/}
					{/*	composition={product.composition}*/}
					{/*	care={product.care}*/}
					{/*/>*/}
				</div>
			</div>
		</div>
	);
};

export default ProductPage;

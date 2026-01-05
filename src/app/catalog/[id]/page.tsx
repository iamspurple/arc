import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import style from "./product.module.scss";
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
		<div className={style.product_page}>
			<div className={style.content}>
				<ImagePicker images={product.images} title={product.title} />

				<div className={style.info}>
					<div className={style.info_container}>
						<h1 className={style.title}>{product.title}</h1>

						<span className={style.price}>{product.price}</span>
					</div>

					<div className={style.info_container}>
						<SizePicker sizes={product.sizes} />
						<button className={style.button} disabled={!product.inStock}>
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

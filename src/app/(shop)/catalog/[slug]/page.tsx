import { ImagePicker } from "@/components/ImagePicker";
import DescriptionPicker from "@/components/DescriptionPicker/DescriptionPicker";

import ProductActions from "@/components/ProductActions/ProductActions";
import { notFound } from "next/navigation";
import style from "./product.module.scss";
import { getCatalogItemByProductOptionSlug, getCatalogs } from "@/entities/catalog";

import { formatPrice } from "@/lib";
import { Metadata } from "next";

type Params = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const products = await getCatalogs();

	return products.map((product) => ({
		slug: product.slug,
	}));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const product = await getCatalogItemByProductOptionSlug(slug);

	if (!product) {
		return {
			title: "Товар не найден",
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	const title = `${product.title} - купить`;
	const description = product.products.description;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			images: product.images.map((p) => p.id),
		},
	};
}

const ProductPage = async ({ params }: Params) => {
	const { slug } = await params;
	const catalogItem = await getCatalogItemByProductOptionSlug(slug);

	if (!catalogItem) {
		notFound();
	}

	return (
		<div className={style.product_page}>
			<div className={style.content}>
				<ImagePicker
					images={catalogItem.images}
					title={catalogItem.products.description}
				/>

				<div className={style.info}>
					<div className={style.info_container}>
						<h1 className={style.title}>{catalogItem.products?.description}</h1>
						<span className={style.price}>{formatPrice(catalogItem.price)}</span>
					</div>
					<ProductActions product={catalogItem} />

					<DescriptionPicker
						description={catalogItem.products.description}
						composition={catalogItem.products.composition}
						care={catalogItem.products.care}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;

import { Metadata } from "next";
import Card from "@/components/Card/Card";
import { getCatalogs } from "@/entities/catalog/lib/get-catalogs";
import style from "./catalog.module.scss";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Каталог товаров - купить онлайн | arc";
	const description = 'Каталог товаров: подробные описания, характеристики, цены и фотографии. Выберите подходящий товар и оформите заказ онлайн.';

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
		},
	};
}

const CatalogPage = async () => {
	const catalogs = await getCatalogs();

	return (
		<main className={style.catalog_page}>
			<div className={style.catalog_page__grid}>
				{catalogs.map((catalog) => (
					<Card key={catalog.id} catalog={catalog} />
				))}
			</div>
		</main>
	);
};

export default CatalogPage;

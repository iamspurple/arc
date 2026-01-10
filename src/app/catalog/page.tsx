import Card, { Product } from "@/components/Card/Card";
import style from "./catalog.module.scss";

async function getProducts(): Promise<Product[]> {
	const res = await fetch("http://localhost:3000/api/products", {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("Failed to fetch products");

	return res.json() as Promise<Product[]>;
}

const CatalogPage = async () => {
	const products = await getProducts();

	return (
		<main className={style.catalog_page}>
			<div className={style.catalog_page__grid}>
				{products.map((product) => (
					<Card key={product.id} product={product} />
				))}
			</div>
		</main>
	);
};

export default CatalogPage;

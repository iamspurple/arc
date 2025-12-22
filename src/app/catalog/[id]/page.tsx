import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
// import SizePicker from "@/components/SizePicker/SizePicker";
import "./product.scss";

type Params = {
	params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
	const product = await prisma.product.findUnique({
		where: { id }, // заменить на slug
		include: { images: true },
	});

	return product;
}

const ProductPage = async ({ params }: Params) => {
	const { id } = await params;
	const product = await getProduct(id); // заменить на slug

	if (!product) {
		notFound();
	}

	const mainImage = product.images[0];

	return (
		<main className="product-page container">
			<div className="content">
				<div className="images">
					{mainImage && (
						<div className="main-image">
							<Image
								src={mainImage.url}
								alt={product.title}
								fill
								sizes="(max-width: 900px) 100vw, 50vw"
								className="image"
								priority
							/>
						</div>
					)}
				</div>

				<div className="info">
					<div className="info-container">
						<h1 className="title">{product.title}</h1>

						<span className="price">{product.price}</span>
					</div>

					<div className="info-container">
						<button className="button" disabled={!product.inStock}>
							{product.inStock ? "Добавить в корзину" : "Нет в наличии"}
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProductPage;

import Image from "next/image";
import Link from "next/link";
import "./Card.scss";

type ProductImage = {
	id: string;
	url: string;
};

export type Product = {
	id: string;
	title: string;
	price: number;
	images: ProductImage[];
};

type Props = {
	product: Product;
};

const Card = ({ product }: Props) => {
	console.log(product);
	const imageUrl = product.images?.[0]?.url; // добавили ?.

	return (
		<Link href={`/catalog/${product.id}`} className="product-card">
			{imageUrl && (
				<div className="product-card__image-wrapper">
					<Image
						src={imageUrl}
						alt={product.title}
						fill
						sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 25vw"
						className="product-card__image"
					/>
				</div>
			)}

			<div className="product-card__info">
				<span className="product-card__title">{product.title}</span>
				<span className="product-card__price">
					{product.price.toLocaleString("ru-RU", { minimumFractionDigits: 0 })}
				</span>
			</div>
		</Link>
	);
};

export default Card;

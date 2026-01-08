import Image from "next/image";
import Link from "next/link";
import style from "./Card.module.scss";

type ProductImage = {
	id: string;
	url: string;
};

export type Product = {
	id: string;
	slug: string;
	title: string;
	price: number;
	images: ProductImage[];
};

type Props = {
	product: Product;
};

const Card = ({ product }: Props) => {
	console.log(product);
	const imageUrl = product.images?.[0]?.url;

	return (
		<Link href={`/catalog/${product.slug}`} className={style.product_card}>
			{imageUrl && (
				<div className={style.image_wrapper}>
					<Image
						src={imageUrl}
						alt={product.title}
						fill
						sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 25vw"
						className={style.image}
					/>
				</div>
			)}

			<div className={style.info}>
				<span className={style.title}>{product.title}</span>
				<span className={style.price}>
					{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
				</span>
			</div>
		</Link>
	);
};

export default Card;

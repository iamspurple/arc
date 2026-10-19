import Image from "next/image";
import Link from "next/link";
import style from "./Card.module.scss";
import { formatPrice } from "@/lib";
import type { CatalogItemType } from "@/entities/catalog";
import { getPreviewForTheCard } from "../../lib/getPreviewForTheCard"

type Props = {
	catalog: CatalogItemType;
};

const Card = ({ catalog }: Props) => {
	const imageUrl = getPreviewForTheCard(catalog.images);

	return (
		<Link href={`/catalog/${catalog.slug}`} className={style.product_card}>
			<div className={style.image_wrapper}>
				<Image
					src={imageUrl}
					alt={catalog.title}
					fill
					loading="eager"
					sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 25vw"
					className={style.image}
				/>
			</div>

			<div className={style.info}>
				<span>{catalog.title}</span>
				<span>{formatPrice(catalog.price)}</span>
			</div>
		</Link>
	);
};

export default Card;

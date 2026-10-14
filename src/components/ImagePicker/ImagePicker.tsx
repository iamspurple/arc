"use client";

import { useState } from "react";
import Image from "next/image";

import { useMediaQuery } from "@/lib/useMediaQuery";
import {CatalogItemType} from "@/entities/catalog"
import { getProductImageUrl } from "../../lib/getProductImageUrl";

import style from "./ImagePicker.module.scss";

type Params = {
	images: CatalogItemType['images'];
	title: string;
};

const ImagePicker = ({ images, title }: Params) => {
	const [mainImageIndex, setMainImageIndex] = useState(0);
	const mainImage = images[mainImageIndex];

	const handleMainImageChange = (index: number) => {
		if (index === mainImageIndex) return;
		setMainImageIndex(index);
	};

	const matches = useMediaQuery("(max-width: 768px)");

	if (matches) {
		return (
			<div className={style.slider_container}>
				<div className={style.slider}>
					{images.map((image) => (
						<div className={style.slide} key={image.id}>
							<Image
								src={getProductImageUrl(image.id)}
								alt={title}
								fill
								loading="eager"
								sizes="(max-width: 768px) 60%"
								priority
							/>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className={style.images}>
			<div className={style.gallery}>
				{images.map((image, index) => (
					<div key={image.id} className={style.gallery_item}>
						<Image
							src={getProductImageUrl(image.id)}
							alt={title}
							fill
							sizes="(max-width: 900px) 100vw, 50vw"
							className={`${style.image} ${index === mainImageIndex ? style.active : ""} `}
							priority
							onClick={() => handleMainImageChange(index)}
						/>
					</div>
				))}
			</div>
			{mainImage && (
				<div className={style.main_image}>
					<Image
						src={getProductImageUrl(mainImage.id)}
						alt={title}
						fill
						sizes="(max-width: 900px) 100vw, 50vw"
						className={style.image}
						priority
					/>
				</div>
			)}
		</div>
	);
};

export default ImagePicker;

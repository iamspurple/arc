"use client";

import { useState } from "react";
import Image from "next/image";
import style from "./ImagePicker.module.scss";

type Params = {
	images: { id: string; url: string; productId: string }[];
	title: string;
};

const ImagePicker = ({ images, title }: Params) => {
	const [mainImageIndex, setMainImageIndex] = useState(0);
	const mainImage = images[mainImageIndex];

	const handleMainImageChange = (index: number) => {
		if (index === mainImageIndex) return;
		setMainImageIndex(index);
	};

	return (
		<div className={style.images}>
			<div className={style.gallery}>
				{images.map((image, index) => (
					<div key={image.id} className={style.gallery_item}>
						<Image
							src={image.url}
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
						src={mainImage.url}
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

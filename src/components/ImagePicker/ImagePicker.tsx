"use client";

import { useState } from "react";
import Image from "next/image";
import "./ImagePicker.scss";

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
		<div className="images">
			<div className="gallery">
				{images.map((image, index) => (
					<div key={image.id} className="gallery-item">
						<Image
							src={image.url}
							alt={title}
							fill
							sizes="(max-width: 900px) 100vw, 50vw"
							className={`image ${index === mainImageIndex ? "active" : ""} `}
							priority
							onClick={() => handleMainImageChange(index)}
						/>
					</div>
				))}
			</div>
			{mainImage && (
				<div className="main-image">
					<Image
						src={mainImage.url}
						alt={title}
						fill
						sizes="(max-width: 900px) 100vw, 50vw"
						className="image"
						priority
					/>
				</div>
			)}
		</div>
	);
};

export default ImagePicker;

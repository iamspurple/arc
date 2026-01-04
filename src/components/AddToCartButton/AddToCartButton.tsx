"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

type Props = {
	product: {
		id: string;
		slug: string;
		title: string;
		price: number;
		inStock: boolean;
		images?: { url: string }[];
	};
	selectedSize: string | null;
	onNoSize?: () => void;
};

const AddToCartButton = ({ product, selectedSize, onNoSize }: Props) => {
	const { addItem } = useCart();
	const [isAdding, setIsAdding] = useState(false);

	const handleAddToCart = () => {
		if (!selectedSize) {
			onNoSize?.();
			return;
		}

		setIsAdding(true);

		addItem({
			id: product.id,
			slug: product.slug,
			title: product.title,
			price: product.price,
			size: selectedSize,
			image: product.images?.[0]?.url,
		});

		setTimeout(() => setIsAdding(false), 300);
	};

	if (!product.inStock) {
		return (
			<button className="button" disabled>
				Нет в наличии
			</button>
		);
	}

	return (
		<button className="button" onClick={handleAddToCart} disabled={isAdding}>
			{isAdding ? "Добавлено!" : "Добавить в корзину"}
		</button>
	);
};

export default AddToCartButton;

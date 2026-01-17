"use client";

import { useEffect, useEffectEvent, useState } from "react";

import { useCart } from "@/context/CartContext";

import style from "./AddToCartButton.module.scss";

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

const addToCart = "Добавить в корзину";
const goToCart = "Перейти в корзину";

const AddToCartButton = ({ product, selectedSize, onNoSize }: Props) => {
	const { addItem, items, openCart } = useCart();
	const [isInCart, setIsInCart] = useState(() => {
		return items.some((item) => item.id == product.id && item.size == selectedSize);
	});

	const handleSetIsInCart = useEffectEvent(() => {
		setIsInCart(items.some((item) => item.id == product.id && item.size == selectedSize));
	});

	useEffect(() => {
		handleSetIsInCart();
	}, [items, selectedSize]);

	const handleAddToCart = () => {
		if (!selectedSize) {
			onNoSize?.();
			return;
		}

		addItem({
			id: product.id,
			slug: product.slug,
			title: product.title,
			price: product.price,
			size: selectedSize,
			image: product.images?.[0]?.url,
		});
	};

	if (!product.inStock) {
		return (
			<button className={style.button} disabled>
				Нет в наличии
			</button>
		);
	}

	return (
		<button
			className={style.button}
			onClick={isInCart ? () => openCart() : () => handleAddToCart()}
		>
			{isInCart ? goToCart : addToCart}
		</button>
	);
};

export default AddToCartButton;

"use client";

import { useEffect, useEffectEvent, useMemo, useState } from "react";

import { useCartData, useCartActions } from "@/context/CartContext";

import { CatalogItem } from "@/entities/catalog";

import style from "./AddToCartButton.module.scss";
import { getPreviewForTheCard } from "@/lib/getPreviewForTheCard";

type Props = {
	product: CatalogItem;
	selectedSizeId: string | null;
	onNoSize?: () => void;
};

const addToCart = "Добавить в корзину";
const goToCart = "Перейти в корзину";

const AddToCartButton = ({ product, selectedSizeId, onNoSize }: Props) => {
	const { items } = useCartData();
	const { addItem, openCart } = useCartActions();
	const [isInCart, setIsInCart] = useState(() => {
		return items.some((item) => item.id == product.id && item.sizeId == selectedSizeId);
	});

	const handleSetIsInCart = useEffectEvent(() => {
		setIsInCart(items.some((item) => item.id == product.id && item.sizeId == selectedSizeId));
	});

	const selectedSize = useMemo(() => product.sizes.find((item) => item.id === selectedSizeId), [selectedSizeId]);

	useEffect(() => {
		handleSetIsInCart();
	}, [items, selectedSizeId]);

	const handleAddToCart = () => {
		if (!selectedSizeId) {
			onNoSize?.();
			return;
		}

		addItem({
			id: product.id,
			slug: product.slug,
			title: product.title,
			price: product.price,
			sizeId: selectedSizeId,
			sizeName: selectedSize ? selectedSize.size : '',
			image: getPreviewForTheCard(product.images),
		});
	};

	if (selectedSize && selectedSize.quantity === 0) {
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

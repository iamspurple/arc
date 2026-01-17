"use client";

import Image from "next/image";
import Link from "next/link";

import type { CartItem as CartItemType } from "@/context/CartContext";

import { formatPrice } from "@/services";

import styles from "./Cart.module.scss";

type Props = {
	item: CartItemType;
	handleClose: () => void;
	onUpdateQuantity: (id: string, size: string, quantity: number) => void;
};

const CartItem = ({ item, handleClose, onUpdateQuantity }: Props) => {
	return (
		<li className={styles.item}>
			<Link href={`/catalog/${item.slug}`} className={styles["item-link"]} onClick={handleClose}>
				{item.image && (
					<div className={styles["item-image"]}>
						<Image src={item.image} alt={item.title} fill sizes="80px" />
					</div>
				)}
				<div className={styles["item-info"]}>
					<span className={styles["item-title"]}>{item.title}</span>
					<span className={styles["item-size"]}>Размер: {item.size}</span>
					<span className={styles["item-unit-price"]}>{formatPrice(item.price)} за шт.</span>
				</div>
			</Link>
			<div className={styles["item-controls"]}>
				<button
					className={styles["quantity-btn"]}
					onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
					aria-label="Уменьшить количество"
				>
					−
				</button>
				<span className={styles["quantity"]}>{item.quantity}шт</span>
				<button
					className={styles["quantity-btn"]}
					onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
					aria-label="Увеличить количество"
				>
					+
				</button>
			</div>
			<span className={styles["item-total"]}>{formatPrice(item.price * item.quantity)}</span>
		</li>
	);
};

export default CartItem;

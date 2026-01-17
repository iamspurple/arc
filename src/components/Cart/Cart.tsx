"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/services";
import { routes } from "@/constants/routes";

import CartItem from "./CartItem";

import styles from "./Cart.module.scss";

const Cart = () => {
	const { items, isOpen, closeCart, updateQuantity, clearCart, totalPrice } = useCart();
	const [isClosing, setIsClosing] = useState(false);
	const timerID = useRef<NodeJS.Timeout | null>(null);

	const handleClose = () => {
		setIsClosing(true);
		timerID.current = setTimeout(() => {
			closeCart();
			setIsClosing(false);
		}, 300);
	};

	useEffect(() => {
		return () => {
			if (timerID.current) {
				clearTimeout(timerID.current);
			}
		};
	}, []);

	if (!isOpen) return null;

	return (
		<>
			<div
				className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
				onClick={handleClose}
			/>
			<div className={`${styles.cart} ${isClosing ? styles.cartClosing : ""}`}>
				<div className={styles.header}>
					<span className={styles.title}>Корзина</span>
					<button className={styles.close} onClick={handleClose} aria-label="Закрыть корзину">
						×
					</button>
				</div>

				<div className={styles.content}>
					{items.length === 0 ? (
						<p className={styles.empty}>Корзина пуста</p>
					) : (
						<ul className={styles.items}>
							{items.map((item) => (
								<CartItem
									key={`${item.id}-${item.size}`}
									item={item}
									handleClose={handleClose}
									onUpdateQuantity={updateQuantity}
								/>
							))}
						</ul>
					)}
				</div>

				{items.length > 0 && (
					<div className={styles.footer}>
						<div className={styles.total}>
							<span>Итого:</span>
							<span>{formatPrice(totalPrice)}</span>
						</div>
						<Link href={routes.checkout} onClick={closeCart}>
							<button className={styles.checkout}>Оформить заказ</button>
						</Link>
						<button className={styles.clear} onClick={clearCart}>
							Очистить корзину
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Cart;

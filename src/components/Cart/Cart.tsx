"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";
import "./Cart.scss";
import CartItem from "./CartItem";

import { formatPrice } from "@/services";
import Link from "next/link";

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
				className={`cart-overlay ${isClosing ? "cart-overlay--closing" : ""}`}
				onClick={handleClose}
			/>
			<div className={`cart ${isClosing ? "cart--closing" : ""}`}>
				<div className="cart__header">
					<span className="cart__title">Корзина</span>
					<button className="cart__close" onClick={handleClose} aria-label="Закрыть корзину">
						×
					</button>
				</div>

				<div className="cart__content">
					{items.length === 0 ? (
						<p className="cart__empty">Корзина пуста</p>
					) : (
						<ul className="cart__items">
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
					<div className="cart__footer">
						<div className="cart__total">
							<span>Итого:</span>
							<span>{formatPrice(totalPrice)}</span>
						</div>
						<Link href="/checkout" onClick={closeCart}>
							<button className="cart__checkout">Оформить заказ</button>
						</Link>
						<button className="cart__clear" onClick={clearCart}>
							Очистить корзину
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Cart;

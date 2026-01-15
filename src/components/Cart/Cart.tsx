"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";
import "./Cart.scss";
import CartItem from "./CartItem";

import { formatPrice } from "@/services";
import Link from "next/link";

const Cart = () => {
	const { items, isOpen, closeCart, updateQuantity, clearCart, totalPrice } = useCart();
	const [shouldRender, setShouldRender] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const closingTimerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (closingTimerRef.current) {
				clearTimeout(closingTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (isOpen) {
			if (closingTimerRef.current) {
				clearTimeout(closingTimerRef.current);
				closingTimerRef.current = null;
			}
			setIsClosing(false);
			setShouldRender(true);
		} else if (shouldRender && !isClosing) {
			setIsClosing(true);
			closingTimerRef.current = setTimeout(() => {
				setShouldRender(false);
				setIsClosing(false);
				closingTimerRef.current = null;
			}, 300);
		}
	}, [isOpen, shouldRender, isClosing]);

	if (!shouldRender) return null;

	return (
		<>
			<div
				className={`cart-overlay ${isClosing ? "cart-overlay--closing" : ""}`}
				onClick={closeCart}
			/>
			<div className={`cart ${isClosing ? "cart--closing" : ""}`}>
				<div className="cart__header">
					<h2 className="cart__title">Корзина</h2>
					<button className="cart__close" onClick={closeCart} aria-label="Закрыть корзину">
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

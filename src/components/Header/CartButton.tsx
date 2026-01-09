"use client";

import { useCart } from "@/context/CartContext";

import style from "./Header.module.scss";

const CartButton = () => {
	const { openCart, totalItems } = useCart();

	return (
		<button type="button" className={style.cart_btn} onClick={openCart}>
			Корзина{totalItems > 0 && <span className={style.cart_count}>({totalItems})</span>}
		</button>
	);
};

export default CartButton;

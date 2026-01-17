"use client";
import Image from "next/image";

import { useCart } from "@/context/CartContext";

import style from "./Header.module.scss";

import { useMediaQuery } from "@/services/useMediaQuery";
const CartButton = () => {
	const { openCart, totalItems } = useCart();
	const matches = useMediaQuery("(max-width: 768px)");

	return (
		<button type="button" className={style.cart_btn} onClick={openCart}>
			{matches ? <Image src={"/shopping-bag.svg"} alt="Корзина" fill /> : <span>Корзина</span>}
			{totalItems > 0 && (
				<span className={style.cart_count}>{matches ? totalItems : `(${totalItems})`}</span>
			)}
		</button>
	);
};

export default CartButton;

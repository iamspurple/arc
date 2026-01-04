"use client";

import { useCart } from "@/context/CartContext";

const CartButton = () => {
	const { openCart, totalItems } = useCart();

	return (
		<button type="button" className="header__link header__cart-btn" onClick={openCart}>
			Корзина{totalItems > 0 && <span className="header__cart-count">({totalItems})</span>}
		</button>
	);
};

export default CartButton;

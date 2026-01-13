"use client";

import { CartItem as CartItemType, useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/services";

type Props = {
	item: CartItemType;
	onUpdateQuantity: (id: string, size: string, quantity: number) => void;
};

const CartItem = ({ item, onUpdateQuantity }: Props) => {
	const { closeCart } = useCart();

	return (
		<li className="cart__item">
			<Link href={`/catalog/${item.slug}`} className="cart__item-link" onClick={closeCart}>
				{item.image && (
					<div className="cart__item-image">
						<Image
							src={item.image}
							alt={item.title}
							fill
							sizes="80px"
							style={{ objectFit: "cover" }}
						/>
					</div>
				)}
				<div className="cart__item-info">
					<span className="cart__item-title">{item.title}</span>
					<span className="cart__item-size">Размер: {item.size}</span>
					<span className="cart__item-unit-price">{formatPrice(item.price)} за шт.</span>
				</div>
			</Link>
			<div className="cart__item-controls">
				<button
					className="cart__quantity-btn"
					onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
					aria-label="Уменьшить количество"
				>
					−
				</button>
				<span className="cart__quantity">{item.quantity}шт</span>
				<button
					className="cart__quantity-btn"
					onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
					aria-label="Увеличить количество"
				>
					+
				</button>
			</div>
			<span className="cart__item-total">{formatPrice(item.price * item.quantity)}</span>
		</li>
	);
};

export default CartItem;

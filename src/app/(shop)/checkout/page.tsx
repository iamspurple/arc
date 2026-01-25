"use client";

import { useCart } from "@/context/CartContext";
import style from "./checkout.module.scss";
import { formatPrice } from "@/services";
import Form from "@/components/Checkout/Form/Form";
import TotalList from "@/components/Checkout/TotalList/TotalList";

const CheckoutPage = () => {
	const { items, totalPrice } = useCart();

	if (items.length === 0) return <p>Для оформления заказа добавьте товары в корзину</p>;

	return (
		<div className={style.checkout_page}>
			<h3>Оформление заявки на заказ</h3>

			<div className={style.container}>
				<div>
					<div className={style.wrapper}>
						<span style={{ lineHeight: 1.6 }}>
							1. Заполните форму, чтобы администратор смог связаться с вами для уточнения деталей
							доставки
						</span>
						<Form />
					</div>
				</div>
				<div>
					<div className={style.wrapper}>
						<span style={{ lineHeight: 1.6 }}>
							2. Проверьте добавленные в корзину позиции и отправьте заявку
						</span>
						<TotalList items={items} />
						<div className={style.total}>
							<span>Итого:</span>
							<span>{formatPrice(totalPrice)}</span>
						</div>

						<button form="checkoutForm" type="submit" className={style.button}>
							Отправить
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;

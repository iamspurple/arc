"use client";

import Image from "next/image";

import { useState } from "react";

import { useCart } from "@/context/CartContext";

import style from "./checkout.module.scss";

const CheckoutPage = () => {
	const { items, totalItems, totalPrice } = useCart();

	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		email: "",
		phone: "",
		messenger: "",
	});

	if (items.length === 0) return <p>Для оформления заказа добавьте товары в корзину</p>;

	return (
		<div className={style.checkout_page}>
			<h3>Оформление заказа</h3>

			<div className={style.container}>
				<form action="" className={style.form}>
					<span></span>
					<div className={style.form_field}>
						<label htmlFor="name">Имя</label>
						<input type="text" placeholder="Имя" />
					</div>
					<div className={style.form_field}>
						<label htmlFor="surname">Фамилия</label>
						<input type="text" placeholder="Фамилия" />
					</div>

					<div className={style.form_field}>
						<label htmlFor="email">E-mail</label>
						<input type="email" placeholder="E-mail" />
					</div>
					<div className={style.form_field}>
						<label htmlFor="phone">Номер телефона</label>
						<input type="tel" name="" id="" placeholder="Телефон" />
					</div>

					<div className={style.select_field}>
						<label className={style.select_label} htmlFor="messenger">
							Cпособ связи:
						</label>
						<select name="" id="">
							<option value="">-</option>
							<option value="email">Электронная почта</option>
							<option value="telegram">Telegram</option>
							<option value="whatsapp">Whatsapp</option>
						</select>
					</div>
				</form>
				<div className={style.total}>
					<span>Ваш заказ:</span>

					<ul>
						{items.map((item) => (
							<li key={`${item.id}-${item.size}`}>
								<div className={style.item}>
									{item.image && (
										<div className={style.item_image}>
											<Image
												src={item.image}
												alt={item.title}
												fill
												sizes="80px"
												style={{ objectFit: "cover" }}
											/>
										</div>
									)}

									<div className={style.details}>
										<span>
											{item.title}, {item.size}
										</span>
										<span>{item.quantity}шт.</span>
									</div>
								</div>
								<span>{item.price * item.quantity}</span>
							</li>
						))}
					</ul>

					<div>
						<div>
							<span>Итого</span>
							<span>{totalPrice}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;

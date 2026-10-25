import style from "./Form.module.scss";

import { useForm } from "react-hook-form";
import { useCartData } from "@/context/CartContext";
import { ContactWayType, createOrder, createOrderProductOptions } from "@/entities/order";
import { type OrderCreateEntity } from "@/entities/order/types/order";
import { useOpenNotificationWithIcon } from "@/shared/hooks/useOpenNotificationWithIcon";
import { useState } from "react";
import { Firework } from "@/components/Firework/Firework";
import { routes } from "@/constants/routes";
import {
	adminTelegramBotName,
	createdOrderTemplateForAdmin,
	sendEmail,
	sendTelegramBot,
} from "@/entities/notification";
import { orderEmailTemplate } from "@/entities/notification/const/notification";

const Form = () => {
	const { items } = useCartData();
	const { onShowNotification, contextHolder } = useOpenNotificationWithIcon();
	const [isOrderSuccess, setIsOrderSuccess] = useState(false);
	const [orderNumber, setOrderNumber] = useState<string | null>(null);
	const [contactWay, setContactWay] = useState<OrderCreateEntity["contactWay"] | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			surname: "",
			email: "",
			phone: "",
			contactMethod: "",
		},
	});

	const onSubmit = async (data: {
		name: string;
		surname: string;
		email: string;
		phone: string;
		contactMethod: string;
	}) => {
		try {
			const customerInfo = {
				customer: `${data.surname} ${data.name}`,
				phone: data.phone,
				email: data.email,
				contactWay: data.contactMethod.toUpperCase() as OrderCreateEntity["contactWay"],
			};

			const result = await createOrder({
				...customerInfo,
				status: "NEW",
			});

			await createOrderProductOptions(
				items.map((item) => ({
					orderId: result.id,
					optionId: item.id,
					sizeId: item.sizeId,
					quantity: item.quantity,
				}))
			);

			await sendTelegramBot({
				message: createdOrderTemplateForAdmin({
					phone: data.phone,
					email: data.email,
					contactWay: data.contactMethod.toUpperCase() as ContactWayType,
					number: result.number,
					customer: data.name,
					createdAt: String(result.createdAt),
					status: "NEW",
				}),
			});

			if (data.contactMethod === "email") {
				await sendEmail({
					to: data.email,
					subject: "arc",
					message: orderEmailTemplate({
						...customerInfo,
						number: result.number,
						status: "NEW",
					}),
				});
			}

			setIsOrderSuccess(true);
			setOrderNumber(result.number);
			setContactWay(result.contactWay);
		} catch (e) {
			onShowNotification({
				type: "error",
				title: "При создании заказа произошла ошибка. Попробуйте снова",
			});
		}
	};

	return (
		<>
			{contextHolder}
			{isOrderSuccess && orderNumber && contactWay && (
				<Firework
					orderNumber={orderNumber}
					title="🎉 Спасибо за заказ!"
					description="В ближайшее время наш менеджер свяжется с Вами для уточнения заказа"
					redirectTo={routes.catalog}
					contactWay={contactWay}
					botName={adminTelegramBotName}
				/>
			)}
			<form onSubmit={handleSubmit(onSubmit)} id="checkoutForm" action="" className={style.form}>
				<div className={style.form_field}>
					<label>Имя</label>
					<input
						autoComplete="off"
						type="text"
						placeholder="Имя"
						{...register("name", {
							required: "Поле обязательно для заполнения",
							pattern: {
								value: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
								message: "Имя может содержать только буквы и пробелы",
							},
						})}
					/>
					{errors.name && <p className={style.error_message}>{errors.name.message}</p>}
				</div>
				<div className={style.form_field}>
					<label htmlFor="surname">Фамилия</label>
					<input
						autoComplete="off"
						type="text"
						placeholder="Фамилия"
						{...register("surname", {
							required: "Поле обязательно для заполнения",
							pattern: {
								value: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
								message: "Фамилия может содержать только буквы и пробелы",
							},
						})}
					/>
					{errors.surname && <p className={style.error_message}>{errors.surname.message}</p>}
				</div>

				<div className={style.form_field}>
					<label htmlFor="email">E-mail</label>
					<input
						autoComplete="off"
						type="email"
						placeholder="E-mail"
						{...register("email", {
							required: "Поле обязательно для заполнения",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Введите корректный email адрес",
							},
						})}
					/>
					{errors.email && <p className={style.error_message}>{errors.email.message}</p>}
				</div>
				<div className={style.form_field}>
					<label htmlFor="phone">Номер телефона</label>
					<input
						autoComplete="off"
						type="tel"
						placeholder="Телефон"
						{...register("phone", {
							required: "Поле обязательно для заполнения",
							pattern: {
								value: /^\+?[0-9\s\-()]{7,}$/,
								message: "Введите корректный номер телефона",
							},
						})}
					/>
					{errors.phone && <p className={style.error_message}>{errors.phone.message}</p>}
				</div>

				<div className={style.select_field}>
					<select id="select" {...register("contactMethod", { required: true })}>
						<option value="" disabled>
							Способ связи*
						</option>
						<option value="email">Электронная почта</option>
						<option value="telegram">Telegram</option>
						<option value="whatsapp">Whatsapp</option>
					</select>
					{errors.contactMethod && <p className={style.error_message}>Выберите способ связи</p>}
				</div>
			</form>
		</>
	);
};

export default Form;

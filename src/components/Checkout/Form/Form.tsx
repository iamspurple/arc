import style from "./Form.module.scss";

import { useForm } from "react-hook-form";

const Form = () => {
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

	const onSubmit = (data: {
		name: string;
		surname: string;
		email: string;
		phone: string;
		contactMethod: string;
	}) => {
		console.log(data);
	};

	return (
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
	);
};

export default Form;

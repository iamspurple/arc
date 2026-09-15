import { Form, Input, Select, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
	OrderCreateEntity,
	OrderUpdateEntity,
	orderEntityCreateSchema,
	orderEntityUpdateSchema,
} from "@/entities/order/types/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { FormValues } from "@/lib/useOrderFormValues";

export const Step1 = ({
	onSubmit,
	orderId,
	isEditMode,
	initialValues,
}: {
	onSubmit: (data: OrderCreateEntity | OrderUpdateEntity) => Promise<void>;
	orderId: string | undefined;
	isEditMode: boolean;
	initialValues?: {
		id?: string | undefined;
		customer: string;
		phone: string;
		email: string;
		contactWay: "EMAIL" | "WHATSAPP" | "TELEGRAM" | undefined;
		status: "NEW" | "PROCESSING" | "COMPLETE" | "CANCELLED" | undefined;
	};
}) => {
	const schema = isEditMode ? orderEntityUpdateSchema : orderEntityCreateSchema;

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<OrderCreateEntity | OrderUpdateEntity>({
		resolver: zodResolver(schema),
		defaultValues: {
			customer: "",
			phone: "",
			email: "",
			status: "NEW",
			contactWay: "TELEGRAM",
		},
	});

	useEffect(() => {
		if (initialValues) {
			reset({
				...(isEditMode && orderId ? { id: orderId } : {}),
				...initialValues,
			});
		}
		return () => {
			reset();
		};
	}, [reset, initialValues, isEditMode, orderId]);

	return (
		<Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
			<Form.Item
				label="ФИО заказчика"
				validateStatus={errors.customer ? "error" : ""}
				help={errors.customer?.message}
			>
				<Controller
					name="customer"
					control={control}
					render={({ field }) => <Input {...field} />}
				/>
			</Form.Item>
			<Form.Item
				label="Номер телефона"
				validateStatus={errors.phone ? "error" : ""}
				help={errors.phone?.message}
				rules={[
					{
						validator(_, value) {
							if (!value) return Promise.reject(new Error("Укажите номер телефона"));
							const normalized = value.replace(/[^\d+]/g, "");
							if (/^(\+7|8)\d{10}$/.test(normalized) || /^\+\d{7,15}$/.test(normalized)) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("Введите корректный номер телефона"));
						},
					},
					{ required: true, message: "Обязательно к заполнению" },
				]}
			>
				<Controller name="phone" control={control} render={({ field }) => <Input {...field} />} />
			</Form.Item>
			<Form.Item
				label="Email"
				validateStatus={errors.email ? "error" : ""}
				help={errors.email?.message}
				rules={[
					{ pattern: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ },
					{ required: true, message: "Обязательно к заполнению" },
				]}
			>
				<Controller name="email" control={control} render={({ field }) => <Input {...field} />} />
			</Form.Item>
			<Form.Item
				label="Способ связи"
				validateStatus={errors.contactWay ? "error" : ""}
				help={errors.contactWay?.message}
			>
				<Controller
					name="contactWay"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							options={[
								{ value: "TELEGRAM", label: "Telegram" },
								{ value: "WHATSAPP", label: "Whatsapp" },
								{ value: "EMAIL", label: "Email" },
							]}
						/>
					)}
				/>
			</Form.Item>
			<Form.Item
				label="Статус"
				validateStatus={errors.status ? "error" : ""}
				help={errors.status?.message}
			>
				<Controller
					name="status"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							options={[
								{ value: "NEW", label: "Новый" },
								{ value: "PROCESSING", label: "В обработке" },
								{ value: "COMPLETE", label: "Завершен" },
								{ value: "CANCELLED", label: "Отменен" },
							]}
						/>
					)}
				/>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Сохранить
				</Button>
			</Form.Item>
		</Form>
	);
};

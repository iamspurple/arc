import { z } from "zod";
import { Status, ContactWay } from "@prisma/client";

const phoneSchema = z
	.string()
	.trim()
	.transform((value) => value.replace(/[^\d+]/g, ""))
	.refine((value) => /^(\+7|7|8)\d{10}$/.test(value), {
		message: "Введите корректный номер телефона",
	})
	.transform((value) => `+7${value.replace(/\D/g, "").slice(-10)}`);

export const orderEntityCreateSchema = z.object({
	customer: z
		.string()
		.min(1, { message: "Обязательно к заполнению" })
		.max(255, { message: "Максимальная длина 255 символов" }),
	phone: phoneSchema,
	email: z.email(),
	contactWay: z.enum(ContactWay),
	status: z.enum(Status),
});
export const orderEntityUpdateSchema = z
	.object({
		id: z.string().min(1, { message: "Обязателен к заполнению" }),
	})
	.extend(orderEntityCreateSchema.shape);

export const orderProductOptionEntityCreateSchema = z.object({
	orderId: z.string().min(1, { message: "Обязателен к заполнению" }),
	optionId: z.string().min(1, { message: "Обязателен к заполнению" }),
	sizeId: z.string().min(1, { message: "Обязателен к заполнению" }),
	quantity: z
		.number()
		.min(1, { message: "Обязательно к заполнению" })
		.max(2147483647, { message: "Максимальное значение 2147483647" }),
});

export const orderProductOptionEntityUpdateSchema = z
	.object({
		id: z.string().min(1, { message: "Обязателен к заполнению" }),
	})
	.extend(orderProductOptionEntityCreateSchema.shape);

export type OrderCreateEntity = z.infer<typeof orderEntityCreateSchema>;
export type OrderUpdateEntity = z.infer<typeof orderEntityUpdateSchema>;
export type OrderProductOptionCreateEntity = z.infer<typeof orderProductOptionEntityCreateSchema>;
export type OrderProductOptionUpdateEntity = z.infer<typeof orderProductOptionEntityUpdateSchema>;

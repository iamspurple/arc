import { z } from "zod";

export const productEntityCreateSchema = z.object({
	description: z
		.string()
		.max(255, { message: "Максимальная длина 255 символов" })
		.optional(),
	composition: z
		.string()
		.max(255, { message: "Максимальная длина 255 символов" })
		.optional(),
	care: z
		.string()
		.max(255, { message: "Максимальная длина 255 символов" })
		.optional(),
});
export const productEntityUpdateSchema = z
	.object({
		id: z.string().min(1, { message: "Обязателен к заполнению" }),
}).merge(productEntityCreateSchema);

export const productOptionCreateEntitySchema = z.object({
	title: z
		.string()
		.min(1, { message: "Обязательно к заполнению" })
		.max(255, { message: "Максимальная длина 255 символов" }),
	slug: z
		.string()
		.min(1, { message: "Обязательно к заполнению" })
		.max(255, { message: "Максимальная длина 255 символов" }),
	price: z
		.number()
		.min(1, { message: "Обязательно к заполнению" })
		.max(2147483647, { message: "Максимальное значение 2147483647" }),
	hex: z
		.string()
		.min(1, { message: "Обязательно к заполнению" })
		.max(12, { message: "Максимальная длина 12 символов" }),
	colorName: z
		.string()
		.min(1, { message: "Обязательно к заполнению" })
		.max(12, { message: "Максимальная длина 12 символов" }),
	productId: z.string().min(1, { message: "Обязателен к заполнению" }),
	imagesId: z.array(z.string()).optional(),
});
export const productOptionUpdateEntitySchema = z
	.object({
		id: z.string().min(1, { message: "Обязателен к заполнению" }),
	}).merge(productOptionCreateEntitySchema);

export const productSizeCreateEntitySchema = z.object({
	order: z
		.number()
		.min(1, { message: "Обязательно к заполнению" })
		.max(2147483647, { message: "Максимальное значение 2147483647" }),
	size: z
		.string()
		.min(1, { message: "Обязательно к заполнению" })
		.max(255, { message: "Максимальная длина 255 символов" }),
	quantity: z
		.number()
		.min(1, { message: "Обязательно к заполнению" })
		.max(2147483647, { message: "Максимальное значение 2147483647" }),
	parameters: z
		.string()
		.min(1, { message: "Обязательно к заполнению" })
		.max(255, { message: "Максимальная длина 255 символов" }),
	optionId: z
		.string()
		.min(1, { message: "Обязателен к заполнению" }),
});
export const productSizeUpdateEntitySchema = z
	.object({
		id: z.string().min(1, { message: "Обязателен к заполнению" }),
	})
	.merge(productSizeCreateEntitySchema);

export const productImageCreateEntitySchema = z.object({
	alt: z
		.string()
		.min(1, { message: "Обязательно к заполнению" })
		.max(255, { message: "Максимальная длина 255 символов" }),
	optionId: z.string().min(1, { message: "Обязателен к заполнению" }),
});
export const productImageUpdateEntitySchema = z
	.object({
		id: z.string().min(1, { message: "Обязателен к заполнению" }),
	})
	.merge(productImageCreateEntitySchema);

export type ProductCreateEntity = z.infer<typeof productEntityCreateSchema>;
export type ProductUpdateEntity = z.infer<typeof productEntityUpdateSchema>;
export type ProductOptionCreateEntity = z.infer<typeof productOptionCreateEntitySchema>;
export type ProductOptionUpdateEntity = z.infer<typeof productOptionUpdateEntitySchema>;
export type ProductSizeCreateEntity = z.infer<typeof productSizeCreateEntitySchema>;
export type ProductSizeUpdateEntity = z.infer<typeof productSizeUpdateEntitySchema>;
export type ProductImageCreateEntity = z.infer<typeof productImageCreateEntitySchema>;
export type ProductImageUpdateEntity = z.infer<typeof productImageUpdateEntitySchema>;




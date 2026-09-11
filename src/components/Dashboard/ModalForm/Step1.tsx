import { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	productEntityCreateSchema,
	productEntityUpdateSchema,
} from "@/entities/product/types/product";
import type { ProductCreateEntity, ProductUpdateEntity } from "@/entities/product/types/product";

import { Form, Input, Button } from "antd";

type Step1Props = {
	onSubmit: (data: ProductCreateEntity | ProductUpdateEntity) => void;
	initialValues?: {
		id?: string;
		name: string;
		description: string;
		composition: string;
		care: string;
	};
	productId?: string;
};

export const Step1 = ({ onSubmit, initialValues, productId }: Step1Props) => {
	const isEditMode = !!productId || !!initialValues?.id;
	const schema = isEditMode ? productEntityUpdateSchema : productEntityCreateSchema;

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProductCreateEntity | ProductUpdateEntity>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			description: "",
			composition: "",
			care: "",
		},
	});

	useEffect(() => {
		if (initialValues) {
			reset({
				...(isEditMode && productId ? { id: productId } : {}),
				...initialValues,
			});
		}
		return () => {
			reset();
		};
	}, [reset, initialValues, isEditMode, productId]);

	return (
		<div>
			<Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
				<Form.Item
					label="Наименование модели"
					validateStatus={errors.name ? "error" : ""}
					help={errors.name?.message}
				>
					<Controller name="name" control={control} render={({ field }) => <Input {...field} />} />
				</Form.Item>
				<Form.Item
					label="Описание"
					validateStatus={errors.description ? "error" : ""}
					help={errors.description?.message}
				>
					<Controller
						name="description"
						control={control}
						render={({ field }) => <Input {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="Состав"
					validateStatus={errors.composition ? "error" : ""}
					help={errors.composition?.message}
				>
					<Controller
						name="composition"
						control={control}
						render={({ field }) => <Input {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="Уход"
					validateStatus={errors.care ? "error" : ""}
					help={errors.care?.message}
				>
					<Controller name="care" control={control} render={({ field }) => <Input {...field} />} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						{isEditMode ? "Сохранить и продолжить" : "Далее"}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

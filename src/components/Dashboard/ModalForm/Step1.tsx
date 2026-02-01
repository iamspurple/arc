import { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { productEntityCreateSchema } from "@/entities/product/types/product";
import type { ProductCreateEntity } from "@/entities/product/types/product";

import { Form, Input, Button } from "antd";

export const Step1 = ({ onSubmit }: { onSubmit: (data: ProductCreateEntity) => void }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<ProductCreateEntity>({
		resolver: zodResolver(productEntityCreateSchema),
		defaultValues: {
			name: "",
			description: "",
			composition: "",
			care: "",
		},
	});

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

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
						Далее
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

import { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

import { useOptionForm } from "@/lib/useOptionForm";

import { Flex, Typography, Form, Button, Input, ColorPicker } from "antd";
import { DeleteOutlined, CloseOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { SizeForm } from "./SizeForm";
import { ImageUpload } from "../ImageUpload";

export type FormData = {
	[key: string]: string | number;
};

export const Step2 = ({
	setStep,
	productId,
}: {
	setStep: (step: number) => void;
	productId: string;
}) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormData>({
		defaultValues: {},
	});

	const { optionFormList, addOptionForm, deleteOptionForm, addSizeForm, deleteSizeForm, onSubmit } =
		useOptionForm({ productId });

	useEffect(() => {
		return () => {
			reset();
			setStep(0);
		};
	}, []);

	return (
		<>
			{optionFormList.map((form, index) => (
				<div key={form.id}>
					<Flex gap={20}>
						<Typography.Title level={4}>Вариант {index + 1}</Typography.Title>
						{form.complete && index < optionFormList.length - 1 && (
							<Button
								danger
								type="text"
								title="Удалить"
								icon={<DeleteOutlined />}
								onClick={() => deleteOptionForm(form.id)}
							/>
						)}
						{!form.complete && index !== 0 && (
							<Button
								danger
								type="text"
								title="Отменить создание"
								icon={<CloseOutlined />}
								onClick={() => deleteOptionForm(form.id)}
							/>
						)}
					</Flex>

					<Form disabled={form.complete} layout="vertical">
						<Form.Item
							label="Название варианта"
							validateStatus={errors[`title_${form.id}`] ? "error" : ""}
							help={errors[`title_${form.id}`]?.message as string}
						>
							<Controller
								name={`title_${form.id}`}
								control={control}
								rules={{
									required: "Обязательно к заполнению",
									maxLength: { value: 255, message: "Максимальная длина 255 символов" },
								}}
								render={({ field }) => (
									<>
										<Input {...field} value={field.value as string} />
									</>
								)}
							/>
						</Form.Item>
						<Form.Item
							label="Цена"
							validateStatus={errors[`price_${form.id}`] ? "error" : ""}
							help={errors[`price_${form.id}`]?.message as string}
						>
							<Controller
								name={`price_${form.id}`}
								control={control}
								rules={{
									required: "Обязательно к заполнению",
									min: { value: 1, message: "Минимальное значение 1" },
									max: { value: 2147483647, message: "Максимальное значение 2147483647" },
									validate: (value) => {
										const num = Number(value);
										return !isNaN(num) || "Должно быть числом";
									},
								}}
								render={({ field }) => (
									<>
										<Input
											type="number"
											min={1}
											{...field}
											value={field.value as number | string}
											onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
										/>
									</>
								)}
							/>
						</Form.Item>
						<Flex justify="space-between">
							<Form.Item
								label="Название цвета"
								style={{ width: "85%" }}
								validateStatus={errors[`colorName_${form.id}`] ? "error" : ""}
								help={errors[`colorName_${form.id}`]?.message as string}
							>
								<Controller
									name={`colorName_${form.id}`}
									control={control}
									rules={{
										required: "Обязательно к заполнению",
										maxLength: { value: 50, message: "Максимальная длина 50 символов" },
									}}
									render={({ field }) => (
										<>
											<Input {...field} value={field.value as string} />
										</>
									)}
								/>
							</Form.Item>
							<Form.Item
								label="Цвет"
								validateStatus={errors[`hex_${form.id}`] ? "error" : ""}
								help={errors[`hex_${form.id}`]?.message as string}
							>
								<Controller
									name={`hex_${form.id}`}
									control={control}
									rules={{
										required: "Обязательно к заполнению",
									}}
									render={({ field }) => (
										<>
											<ColorPicker
												format="hex"
												value={field.value as string}
												onChange={(color) => field.onChange(color.toHexString())}
											/>
										</>
									)}
								/>
							</Form.Item>
						</Flex>
						<Form.Item label="Изображения (5)" name={`images_${form.id}`}>
							<ImageUpload />
						</Form.Item>
						{form.size.map((sizeId: string, i) => (
							<SizeForm
								key={sizeId}
								sizeId={sizeId}
								index={i}
								deleteSizeForm={deleteSizeForm}
								formId={form.id}
								errors={errors}
								control={control}
							/>
						))}
						{!form.complete && (
							<Button
								icon={<PlusSquareOutlined />}
								color="primary"
								onClick={() => addSizeForm(form.id)}
							>
								Добавить размер
							</Button>
						)}
					</Form>
				</div>
			))}
			<Button
				size="large"
				color="primary"
				disabled={!isValid}
				variant="outlined"
				onClick={addOptionForm}
			>
				Добавить ещё один вариант
			</Button>
			<Button size="large" type="primary" onClick={handleSubmit(onSubmit)}>
				Сохранить и завершить
			</Button>
		</>
	);
};

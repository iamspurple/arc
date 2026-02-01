import { Controller } from "react-hook-form";
import type { FieldErrors, Control } from "react-hook-form";

import type { FormData } from "./Step2";

import { Flex, Form, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

type SizeFormProps = {
	formId: string;
	sizeId: string;
	index: number;
	errors: FieldErrors<FormData>;
	control: Control<FormData>;
	deleteSizeForm: (formId: string, sizeId: string) => void;
};

export const SizeForm = ({
	formId,
	index,
	errors,
	control,
	deleteSizeForm,
	sizeId,
}: SizeFormProps) => {
	return (
		<Flex justify="flex-start" gap={10} style={{ position: "relative" }}>
			<Form.Item
				label="Размер"
				validateStatus={errors[`size_${formId}_${index}`] ? "error" : ""}
				help={errors[`size_${formId}_${index}`]?.message as string}
			>
				<Controller
					name={`size_${formId}_${index}`}
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
				label="Количество"
				validateStatus={errors[`quantity_${formId}_${index}`] ? "error" : ""}
				help={errors[`quantity_${formId}_${index}`]?.message as string}
			>
				<Controller
					name={`quantity_${formId}_${index}`}
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
			<Form.Item
				label="Параметры"
				style={{ width: "100%" }}
				validateStatus={errors[`parameters_${formId}_${index}`] ? "error" : ""}
				help={errors[`parameters_${formId}_${index}`]?.message as string}
			>
				<Controller
					name={`parameters_${formId}_${index}`}
					control={control}
					rules={{
						required: "Обязательно к заполнению",
						maxLength: { value: 255, message: "Максимальная длина 255 символов" },
					}}
					render={({ field }) => (
						<>
							<Input.TextArea rows={1} {...field} value={field.value as string} />
						</>
					)}
				/>
			</Form.Item>
			{index > 0 && (
				<Button
					danger
					type="link"
					size="small"
					title="Удалить размер"
					icon={<CloseOutlined />}
					style={{ position: "absolute", top: 0, right: 0 }}
					onClick={() => deleteSizeForm(formId, sizeId)}
				/>
			)}
		</Flex>
	);
};

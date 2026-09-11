import { Flex, Form, Input, Button, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import type { FormListFieldData } from "antd";

type SizeFormProps = {
	sizeField: FormListFieldData;
	sizeIndex: number;
	isFirstSize: boolean;
	removeSize: (sizeIndex: number | number[]) => void;
	validateDebounceMs: number;
};

export const SizeForm = (props: SizeFormProps) => {
	const { sizeField, sizeIndex, isFirstSize, removeSize, validateDebounceMs } = props;

	return (
		<Flex justify="flex-start" gap={10} style={{ position: "relative" }}>
			<Form.Item name={[sizeField.name, "id"]} hidden>
				<Input />
			</Form.Item>
			<Form.Item
				label="Размер"
				name={[sizeField.name, "size"]}
				style={{ width: "85%" }}
				validateDebounce={validateDebounceMs}
				rules={[
					{ required: true, message: "Обязательно к заполнению" },
					{ max: 255, message: "Максимальная длина 255 символов" },
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Количество"
				name={[sizeField.name, "quantity"]}
				validateDebounce={validateDebounceMs}
				rules={[
					{ required: true, message: "Обязательно к заполнению" },

					{
						validator: (_, value) => {
							if (value > 0 && value < 2147483647) {
								return Promise.resolve();
							} else {
								return Promise.reject(new Error("Число должно быть больше 0 и меньше 2147483637"));
							}
						},
					},
				]}
			>
				<InputNumber />
			</Form.Item>
			<Form.Item
				label="Параметры"
				name={[sizeField.name, "parameters"]}
				style={{ width: "100%" }}
				validateDebounce={validateDebounceMs}
				rules={[
					{ required: true, message: "Обязательно к заполнению" },
					{ max: 255, message: "Максимальная длина 255 символов" },
				]}
			>
				<Input.TextArea rows={1} />
			</Form.Item>
			{!isFirstSize && (
				<Button
					danger
					type="link"
					size="small"
					title="Удалить размер"
					icon={<DeleteOutlined />}
					style={{ position: "absolute", top: 0, right: 0 }}
					onClick={() => removeSize(sizeIndex)}
				/>
			)}
		</Flex>
	);
};

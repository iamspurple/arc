import {
	Form,
	Input,
	Typography,
	InputNumber,
	Flex,
	Button,
	Select,
	Image,
	SelectProps,
} from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import type { FormListFieldData, FormInstance } from "antd";

type OptionFormProps = {
	optionField: FormListFieldData;
	form: FormInstance;
	items:
		| {
				id: string;
				productName: string;
				optionName: string;
				article: string;
				image: string;
		  }[]
		| undefined;
	allSizes:
		| {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				optionId: string;
				order: number;
				size: string;
				quantity: number;
				parameters: string;
		  }[]
		| undefined;
	remove: (index: number) => void;
	index: number;
};

export const OptionForm = (props: OptionFormProps) => {
	const { optionField, allSizes, remove, index, form } = props;

	const option = form.getFieldValue(["options", optionField.name]);
	console.log(option);

	const optionId = Form.useWatch(["options", optionField.name, "optionId"], form);

	const sizeName = Form.useWatch(["options", optionField.name, "sizeId"], form);

	const sizes: Record<string, number> = {};
	const sizesOptions: SelectProps["options"] = [];
	allSizes?.forEach((size) => {
		if (size.optionId === optionId) {
			sizes[size.id] = size.quantity;
			sizesOptions.push({ value: size.id, label: size.size });
		}
	});

	return (
		<Form.Item>
			<Flex justify="space-between" key={optionId}>
				<Flex justify="space-between">
					<Image
						width={50}
						height={50}
						src={`/static/products/${option.image}`}
						alt={`${option?.productName} ${option.optionName}`}
					/>
					<Flex vertical>
						<Typography.Text strong style={{ textWrap: "nowrap" }}>
							{option.productName} | {option.optionName}
						</Typography.Text>
						<Typography.Text type="secondary">{option.article}</Typography.Text>
					</Flex>
					<Form.Item hidden name={[optionField.name, "optionId"]}>
						<Input hidden />
					</Form.Item>
					<Flex>
						<Form.Item name={[optionField.name, "sizeId"]}>
							<Select placeholder="Выберите размер" options={sizesOptions} />
						</Form.Item>
						<Form.Item name={[optionField.name, "quantity"]}>
							<InputNumber
								disabled={!sizeName}
								min={1}
								placeholder="0"
								mode="spinner"
								max={sizes[sizeName]}
							/>
						</Form.Item>
					</Flex>
				</Flex>
				<Button
					danger
					type="text"
					title="Удалить"
					icon={<DeleteOutlined />}
					onClick={() => remove(index)}
				/>
			</Flex>
		</Form.Item>
	);
};

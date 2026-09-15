import { Form, Input, Typography, InputNumber, Button, Select, Image, SelectProps } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import type { FormListFieldData, FormInstance } from "antd";
import { getProductImagePublicUrl } from "@/lib/productImageUpload";

import styles from "./Step2.module.scss";

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
	const optionId = Form.useWatch(["options", optionField.name, "optionId"], form);
	const sizeName = Form.useWatch(["options", optionField.name, "sizeId"], form);

	if (!option) return null;

	const sizes: Record<string, number> = {};
	const sizesOptions: SelectProps["options"] = [];
	allSizes?.forEach((size) => {
		if (size.optionId === optionId) {
			sizes[size.id] = size.quantity;
			sizesOptions.push({ value: size.id, label: size.size });
		}
	});

	return (
		<div className={styles.optionRow} key={optionId}>
			<Image
				width={50}
				height={50}
				src={getProductImagePublicUrl(option.image)}
				alt={`${option?.productName} ${option.optionName}`}
				preview={false}
			/>

			<div className={styles.optionInfo}>
				<Typography.Text strong className={styles.optionTitle}>
					{option.productName} | {option.optionName}
				</Typography.Text>
				<Typography.Text type="secondary">{option.article}</Typography.Text>
			</div>

			<Form.Item hidden name={[optionField.name, "optionId"]}>
				<Input hidden />
			</Form.Item>

			<Form.Item
				rules={[{ required: true, message: "Выберите размер" }]}
				name={[optionField.name, "sizeId"]}
				className={`${styles.optionField} ${styles.optionControl}`}
			>
				<Select placeholder="Выберите размер" options={sizesOptions} />
			</Form.Item>

			<Form.Item
				rules={[{ required: true, message: "Укажите количество" }]}
				name={[optionField.name, "quantity"]}
				className={`${styles.optionField} ${styles.optionControl}`}
			>
				<InputNumber
					required
					disabled={!sizeName}
					min={1}
					placeholder="0"
					mode="spinner"
					max={sizes[sizeName]}
				/>
			</Form.Item>

			<Button
				danger
				type="text"
				title="Удалить"
				icon={<DeleteOutlined />}
				onClick={() => remove(index)}
			/>
		</div>
	);
};

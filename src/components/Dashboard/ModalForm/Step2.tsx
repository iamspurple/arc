import { useEffect, useMemo, useState } from "react";
import { Button, Flex, Form, Input, InputNumber, Typography, ColorPicker, message } from "antd";
import { DeleteOutlined, CloseOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import type {
	ProductOptionCreateEntity,
	ProductOptionUpdateEntity,
	ProductSizeCreateEntity,
	ProductSizeUpdateEntity,
} from "@/entities/product";

import { PRODUCT_OPTIONS_QUERY_KEY } from "@/entities/product/api/useProductsQuery";

import type { QueryClient } from "@tanstack/react-query";
import { submitHandlers } from "@/lib/submitHandlers";
import { SizeForm } from "./SizeForm";
import { UIImageUpload } from "./UIImageUpload";

type SizeFormData = Omit<ProductSizeCreateEntity, "order" | "optionId"> & {
	id?: string;
};
type OptionFormData = Omit<ProductOptionCreateEntity, "slug" | "images" | "productId"> & {
	id?: string;
	fieldKey: string;
	sizes: SizeFormData[];
};

export type ImgInitialType = {
	id: string;
	trigger: "new" | "old";
	src: string;
	file?: File;
};

export type FormData = {
	options: OptionFormData[];
};

export type Step2Props = {
	productId: string;
	productName: string;
	queryClient: QueryClient;
	setStep: (step: number) => void;
	handleClose: () => void;
	initialValues?: {
		options: Array<{
			id: string;
			fieldKey: string;
			title: string;
			price: number;
			hex: string;
			colorName: string;
			sizes: Array<{
				id: string;
				size: string;
				quantity: number;
				parameters: string;
			}>;
			images: Array<{
				id: string;
				alt: string;
			}>;
		}>;
	};
};

export const Step2 = (props: Step2Props) => {
	const { productId, productName, queryClient, setStep, initialValues, handleClose } = props;
	const [form] = Form.useForm();
	const isEditMode = !!initialValues;

	const validateDebounceMs = 1500;

	const [files, setFiles] = useState(() => {
		const optionsImages: Record<string, ImgInitialType[]> = {};

		initialValues?.options.map((option) => {
			const imagesArray: ImgInitialType[] = [];

			option.images.map((image) => {
				const imgObj: ImgInitialType = {
					id: image.id,
					trigger: "old",
					src: `/static/products/${image.id}`,
				};
				imagesArray.push(imgObj);
			});
			optionsImages[option.fieldKey] = imagesArray;
		});
		return optionsImages;
	});

	const handleSubmit = async (data: FormData) => {
		console.log(data.options);
		const { handleCreateSubmit, handleUpdateSubmit } = submitHandlers(
			data,
			productId,
			productName,
			files
		);
		try {
			if (isEditMode) {
				await handleUpdateSubmit(initialValues);

				setTimeout(() => {
					handleClose();
					message.success("Варианты успешно обновлены");
				}, 1500);
			} else {
				await handleCreateSubmit();
				setTimeout(() => {
					handleClose();
					message.success("Варианты успешно созданы");
				}, 1500);
			}

			setStep(0);
			queryClient.invalidateQueries({ queryKey: [PRODUCT_OPTIONS_QUERY_KEY] });
			form.resetFields();
		} catch (e) {
			console.error(e);
			message.error(isEditMode ? "Не удалось обновить варианты" : "Не удалось создать варианты");
		}
	};

	const defaultValues = useMemo(() => ({ options: [{ sizes: [{}], fieldKey: uuidv4() }] }), []);

	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue(initialValues);
		} else {
			form.setFieldsValue(defaultValues);
		}
	}, [form, initialValues, defaultValues]);

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				requiredMark="optional"
				initialValues={initialValues || defaultValues}
				onFinish={handleSubmit}
			>
				<Form.List name="options">
					{(fields, { add, remove }) => (
						<>
							{fields.map((field, index) => {
								const isFirst = index == 0;
								const isLast = index == fields.length - 1;

								const fieldKey = form.getFieldValue(["options", field.name, "fieldKey"]);

								return (
									<div key={field.key}>
										<Flex gap={20}>
											<Typography.Title level={4}>Вариант {index + 1}</Typography.Title>
											{!isLast && (
												<Button
													danger
													type="text"
													title="Удалить"
													icon={<DeleteOutlined />}
													onClick={() => remove(index)}
												/>
											)}
											{isLast && !isFirst && (
												<Button
													danger
													type="text"
													title="Удалить"
													icon={<DeleteOutlined />}
													onClick={() => remove(index)}
												/>
											)}
										</Flex>
										<Form.Item name={[field.name, "id"]} hidden>
											<Input />
										</Form.Item>
										<Form.Item name={[field.name, "fieldKey"]} hidden>
											<Input />
										</Form.Item>
										<Form.Item
											label="Название варианта"
											name={[field.name, "title"]}
											validateDebounce={validateDebounceMs}
											rules={[
												{ required: true, message: "Обязательно к заполнению" },
												{ max: 255, message: "Максимальная длина 255 символов" },
											]}
										>
											<Input />
										</Form.Item>
										<Form.Item
											label="Цена"
											name={[field.name, "price"]}
											validateDebounce={validateDebounceMs}
											rules={[
												{ required: true, message: "Обязательно к заполнению" },

												{
													validator: (_, value) => {
														if (value && value > 1 && value < 2147483647) {
															return Promise.resolve();
														} else {
															return Promise.reject(
																new Error("Число должно быть больше 1 и меньше 2147483637")
															);
														}
													},
												},
											]}
										>
											<InputNumber style={{ width: "100%" }} />
										</Form.Item>
										<Flex justify="space-between">
											<Form.Item
												label="Название цвета"
												name={[field.name, "colorName"]}
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
												label="Цвет"
												name={[field.name, "hex"]}
												validateDebounce={validateDebounceMs}
												rules={[{ required: true, message: "Обязательно к заполнению" }]}
												getValueFromEvent={(color) => color.toHexString()}
											>
												<ColorPicker format="hex" />
											</Form.Item>
										</Flex>
										<Form.Item label="Изображения" rules={[{ required: true }]}>
											<UIImageUpload
												initialData={files[fieldKey] ?? []}
												setFiles={setFiles}
												optionKey={fieldKey}
											/>
										</Form.Item>
										<Form.Item>
											<Form.List name={[field.name, "sizes"]}>
												{(sizeFields, { add: addSize, remove: removeSize }) => (
													<>
														{sizeFields.map((sizeField, sizeIndex) => {
															const isFirstSize = sizeIndex == 0;
															return (
																<SizeForm
																	key={sizeIndex}
																	sizeField={sizeField}
																	sizeIndex={sizeIndex}
																	removeSize={removeSize}
																	validateDebounceMs={validateDebounceMs}
																	isFirstSize={isFirstSize}
																/>
															);
														})}
														{isLast && (
															<Button
																icon={<PlusSquareOutlined />}
																color="primary"
																onClick={addSize}
															>
																Добавить размер
															</Button>
														)}
													</>
												)}
											</Form.List>
										</Form.Item>
									</div>
								);
							})}
							<Button
								size="large"
								color="primary"
								variant="outlined"
								style={{ marginRight: "7%" }}
								onClick={() => {
									form
										.validateFields()
										.then(() => add({ sizes: [{}], fieldKey: uuidv4() }))
										.catch((err) => err);
								}}
							>
								Добавить ещё один вариант
							</Button>
						</>
					)}
				</Form.List>

				<Button size="large" htmlType="submit" type="primary">
					{isEditMode ? "Сохранить изменения" : "Сохранить и завершить"}
				</Button>
			</Form>
		</>
	);
};

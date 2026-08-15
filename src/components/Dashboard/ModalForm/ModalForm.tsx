import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { createProduct, updateProductById } from "@/entities/product/server";
import { PRODUCTS_QUERY_KEY } from "@/entities/product/api/useProductsQuery";
import type { ProductCreateEntity, ProductUpdateEntity } from "@/entities/product/types/product";

import { Steps, message } from "antd";

import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { FormValues } from "@/lib/useFormValues";

export const ModalForm = ({
	formValues,
	productId: externalProductId,
	handleClose,
}: {
	formValues: FormValues | null;
	isLoading?: boolean;
	productId?: string;
	handleClose: () => void;
}) => {
	const [step, setStep] = useState(0);

	const [internalProductId, setInternalProductId] = useState<string>("");
	const [productName, setProductName] = useState<string>("");
	const productId = externalProductId || internalProductId;
	const isEditMode = !!productId;

	const queryClient = useQueryClient();

	const onProductSubmit = async (data: ProductCreateEntity | ProductUpdateEntity) => {
		try {
			if (isEditMode && productId) {
				const updated = await updateProductById(data as ProductUpdateEntity);
				setProductName(updated.name);
				message.success("Модель успешно обновлена");
			} else {
				const created = await createProduct(data as ProductCreateEntity);
				setInternalProductId(created.id);
				setProductName(created.name);
				message.success("Модель успешно создана");
			}

			setStep(1);
			queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
		} catch (e) {
			console.error(e);
			message.error(isEditMode ? "Не удалось обновить модель" : "Не удалось создать модель");
		}
	};

	const step1InitialValues = formValues
		? {
				name: formValues.name,
				description: formValues.description,
				composition: formValues.composition,
				care: formValues.care,
			}
		: undefined;

	const step2InitialValues = formValues
		? {
				options: formValues.options.map((option) => ({
					id: option.id,
					fieldKey: option.id,
					title: option.title,
					price: option.price,
					hex: option.hex,
					colorName: option.colorName,
					sizes: option.sizes.map((size) => ({
						id: size.id,
						size: size.size,
						quantity: size.quantity,
						parameters: size.parameters,
					})),
					images: option.images.map((image) => ({
						id: image.id,
						alt: image.alt,
					})),
				})),
			}
		: undefined;

	return (
		<div style={{ paddingTop: 30, display: "flex", flexDirection: "column", gap: 25 }}>
			<Steps
				current={step}
				items={[
					{ title: "Шаг 1 ", content: formValues ? "Редактирование модели" : "Создание модели" },
					{
						title: "Шаг 2",
						content: formValues ? "Редактирование вариантов" : "Создание вариантов",
					},
				]}
			/>

			{step === 0 && (
				<Step1
					onSubmit={onProductSubmit}
					initialValues={step1InitialValues}
					productId={productId}
				/>
			)}

			{step === 1 && productId && (
				<Step2
					productId={productId}
					productName={productName}
					queryClient={queryClient}
					setStep={setStep}
					initialValues={step2InitialValues}
					handleClose={handleClose}
				/>
			)}
		</div>
	);
};

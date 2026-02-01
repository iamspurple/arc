import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { createProduct } from "@/entities/product/server";
import { PRODUCTS_QUERY_KEY } from "@/entities/product/api/useProductsQuery";
import type { ProductCreateEntity } from "@/entities/product/types/product";

import { useDashboardActions } from "@/context/DashboardContext";

import { Steps, message } from "antd";

import { Step1 } from "./Step1";
import { Step2 } from "./Step2";

export const ModalForm = () => {
	const [step, setStep] = useState(0);

	const queryClient = useQueryClient();

	const { setProductId } = useDashboardActions();

	const onProductSubmit = async (data: ProductCreateEntity) => {
		try {
			const created = await createProduct(data);
			setProductId(created.id);
			setStep(1);
			message.success("Модель успешно создана");
			queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
		} catch (e) {
			console.error(e);
			message.error("Не удалось создать модель");
		}
	};

	return (
		<div style={{ paddingTop: 30, display: "flex", flexDirection: "column", gap: 25 }}>
			<Steps
				current={step}
				items={[
					{ title: "Шаг 1 ", content: "Создание модели" },
					{ title: "Шаг 2", content: "Создание вариантов" },
				]}
			/>

			{step === 0 && <Step1 onSubmit={onProductSubmit} />}

			{step === 1 && <Step2 setStep={setStep} />}
		</div>
	);
};

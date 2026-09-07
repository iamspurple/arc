import { Steps, message } from "antd";
import { useState } from "react";
import { Step1 } from "./Step1";
import { useQueryClient } from "@tanstack/react-query";
import { ORDERS_QUERY_KEY } from "@/entities/order/api/useOrdersQuery";
import { OrderCreateEntity } from "@/entities/order/types/order";
import { createOrder } from "@/entities/order/services/order";
import { Step2 } from "./Step2";

export const ModalForm = () => {
	const queryClient = useQueryClient();
	const [step, setStep] = useState(0);
	const [orderId, setOrderId] = useState("");

	const onOrderSubmit = async (data: OrderCreateEntity) => {
		try {
			const order = await createOrder(data);
			setOrderId(order.id);
			setStep(1);
		} catch (e) {
			console.error(e);
			message.error("Не удалось создать заказ");
		}
		queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
		console.log(data);
	};

	return (
		<div style={{ paddingTop: 30, display: "flex", flexDirection: "column", gap: 25 }}>
			<Steps
				current={step}
				items={[
					{ title: "Шаг 1 ", content: "Контакты заказчика" },
					{
						title: "Шаг 2",
						content: "Позиции заказа",
					},
				]}
			/>
			{step === 0 && <Step1 onSubmit={onOrderSubmit} />}
			{step === 1 && <Step2 orderId={orderId} />}
		</div>
	);
};

import { Steps, message } from "antd";
import { useState } from "react";
import { Step1 } from "./Step1";
import { useQueryClient } from "@tanstack/react-query";
import { ORDERS_QUERY_KEY } from "@/entities/order/api/useOrdersQuery";
import { OrderCreateEntity, OrderUpdateEntity } from "@/entities/order/types/order";
import { Step2 } from "./Step2";
import { useOrderFormValues } from "@/lib/useOrderFormValues";
import { useCreateOrderMutation, useUpdateOrderMutation } from "@/entities/order"

export const ModalForm = ({
	externalOrderId,
	handleClose,
}: {
	externalOrderId: string | undefined;
	handleClose: () => void;
}) => {
	const queryClient = useQueryClient();
	const [step, setStep] = useState(0);
	const [internalOrderId, setInternalOrderId] = useState("");
	const orderId = externalOrderId || internalOrderId;

	const isEditMode = !!orderId;

	const createOrderMutation = useCreateOrderMutation();
	const updateOrderMutation = useUpdateOrderMutation();

	const onOrderSubmit = async (data: OrderCreateEntity | OrderUpdateEntity) => {
		try {
			if (isEditMode && orderId) {
				updateOrderMutation.mutate(data as OrderUpdateEntity);
				message.success("Контакты покупателя обновлены");
				setStep(1);
			} else {
				createOrderMutation.mutate(data as OrderCreateEntity, {
					onSuccess: (data) => {
						setInternalOrderId(data.id);
						setStep(1);
						message.success("Заказ создан, контакты покупателя сохранены");
					},
					onError: (error) => {
						message.error(error.message);
					}
				});
			}
		} catch {
			message.error(isEditMode ? "Не удалось обновить заказ" : "Не удалось создать заказ");
		}
		queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
	};

	const formValues = useOrderFormValues(orderId);

	const step1InitialValues = formValues
		? {
				id: formValues.id,
				customer: formValues.customer,
				phone: formValues.phone,
				email: formValues.email,
				contactWay: formValues.contactWay,
				status: formValues.status,
			}
		: undefined;

	const step2InitialValues = formValues
		? {
				options: formValues.options,
			}
		: undefined;

	return (
		<div style={{ paddingTop: 30, display: "flex", flexDirection: "column", gap: 25 }}>
			<Steps
				current={step}
				items={[
					{ title: "Шаг 1 ", content: "Контакты покупателя" },
					{
						title: "Шаг 2",
						content: "Позиции заказа",
					},
				]}
			/>
			{step === 0 && (
				<Step1
					initialValues={step1InitialValues}
					onSubmit={onOrderSubmit}
					isEditMode={isEditMode}
					orderId={orderId}
				/>
			)}
			{step === 1 && (
				<Step2
					handleClose={handleClose}
					initialValues={step2InitialValues}
					orderId={orderId}
					isEditMode={isEditMode}
				/>
			)}
		</div>
	);
};

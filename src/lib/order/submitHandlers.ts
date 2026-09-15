import type { FormData } from "@/components/Dashboard/Order/ModalForm/Step2";
import {
	createOrderProductOption,
	deleteOrderProductOptionById,
	updateOrderProductOptionById,
} from "@/entities/order/services/orderProductOption";
import {
	OrderProductOptionCreateEntity,
	OrderProductOptionUpdateEntity,
} from "@/entities/order/types/order";

import type { Step2Props } from "@/components/Dashboard/Order/ModalForm/Step2";

export const useSubmitHandlers = (orderId: string) => {
	const handleCreateSubmit = async (data: FormData) => {
		for (const option of data.options) {
			const orderOptionPayload: OrderProductOptionCreateEntity = {
				orderId,
				optionId: option.optionId,
				sizeId: option.sizeId,
				quantity: option.quantity,
			};

			await createOrderProductOption(orderOptionPayload);
		}
	};

	const handleUpdateSubmit = async (data: FormData, initialValues: Step2Props["initialValues"]) => {
		const existingIds =
			initialValues?.options
				.map((option) => option.id)
				.filter((id): id is string => !!id) || [];

		const formIds = data.options
			.map((opt) => opt.id)
			.filter((id): id is string => !!id);

		for (const existingId of existingIds) {
			if (!formIds.some((id) => id === existingId)) {
				try {
					await deleteOrderProductOptionById(existingId);
				} catch (error) {
					console.error(`Не удалось удалить опцию ${existingId}:`, error);
				}
			}
		}

		for (const option of data.options) {
			if (option.id) {
				const orderOptionPayload: OrderProductOptionUpdateEntity = {
					id: option.id,
					orderId: orderId,
					optionId: option.optionId,
					quantity: option.quantity,
					sizeId: option.sizeId,
				};

				await updateOrderProductOptionById(orderOptionPayload);
			} else {
				const orderOptionPayload: OrderProductOptionCreateEntity = {
					orderId,
					optionId: option.optionId,
					sizeId: option.sizeId,
					quantity: option.quantity,
				};

				await createOrderProductOption(orderOptionPayload);
			}
		}
	};

	return { handleCreateSubmit, handleUpdateSubmit };
};

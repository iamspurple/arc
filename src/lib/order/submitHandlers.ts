import type { FormData } from "@/components/Dashboard/Order/ModalForm/Step2";
import { createOrderProductOption } from "@/entities/order/services/orderProductOption";
import { OrderProductOptionCreateEntity } from "@/entities/order/types/order";

export const useSubmitHandlers = ({ orderId }: { orderId: string }) => {
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

	return { handleCreateSubmit };
};

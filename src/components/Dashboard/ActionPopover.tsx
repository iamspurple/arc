import { useQueryClient } from "@tanstack/react-query";

import { deleteProductById } from "@/entities/product/server";

import { Button, Popover, Flex, Popconfirm } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { PRODUCTS_QUERY_KEY } from "@/entities/product/api/useProductsQuery";

const Content = (id: string) => {
	const queryClient = useQueryClient();

	const handleDelete = async () => {
		deleteProductById(id);
		await queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
	};

	return (
		<Flex vertical>
			<Button type="text" onClick={() => console.log(id)}>
				Редактировать
			</Button>

			<Popconfirm
				title="Удалить запись"
				description="Вы уверены, что хотите удалить запись?"
				onConfirm={handleDelete}
				okText="Да"
				cancelText="Отмена"
				placement="left"
			>
				<Button danger type="text">
					Удалить
				</Button>
			</Popconfirm>
		</Flex>
	);
};

export const ActionPopover = ({ id }: { id: string }) => {
	return (
		<Popover content={Content(id)} trigger="click">
			<Button type="text" style={{ cursor: "pointer" }} icon={<MoreOutlined />} />
		</Popover>
	);
};

export default ActionPopover;

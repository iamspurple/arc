import { useQueryClient } from "@tanstack/react-query";

import { deleteProductById } from "@/entities/product/server";

import { Button, Popover, Flex, Popconfirm, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { PRODUCTS_QUERY_KEY } from "@/entities/product/api/useProductsQuery";
import { useState } from "react";

const Content = (
	id: string,
	showEditModal: (id: string) => void,
	setOpen: (value: boolean) => void
) => {
	const queryClient = useQueryClient();

	const handleDelete = async () => {
		try {
			deleteProductById(id);
			await queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
			message.success("Запись успешно удалена");
		} catch {
			message.error("Что-то пошло не так, попробуйте снова");
		}
	};

	return (
		<Flex vertical>
			<Popconfirm
				title="Редактировать запись"
				description="Открыть форму?"
				onConfirm={() => {
					showEditModal(id);
					setOpen(false);
				}}
				okText="Да"
				cancelText="Отмена"
				placement="left"
				onCancel={() => setOpen(false)}
			>
				<Button type="text">Редактировать</Button>
			</Popconfirm>

			<Popconfirm
				title="Удалить запись"
				description="Вы уверены, что хотите удалить запись?"
				onConfirm={() => {
					handleDelete();
					setOpen(false);
				}}
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

export const ActionPopover = ({
	id,
	showEditModal,
}: {
	id: string;
	showEditModal: (id: string) => void;
}) => {
	const [open, setOpen] = useState(false);
	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
	};

	return (
		<Popover
			open={open}
			onOpenChange={handleOpenChange}
			content={Content(id, showEditModal, setOpen)}
			trigger="click"
		>
			<Button type="text" style={{ cursor: "pointer" }} icon={<MoreOutlined />} />
		</Popover>
	);
};

export default ActionPopover;

import { useContentSider } from "@/context/ContentSiderContext";

import { Flex, Button } from "antd";
import type { TableColumnsType } from "antd";

import ActionPopover from "@/components/Dashboard/ActionPopover";

export const Columns = () => {
	const { handleOpenSider } = useContentSider();

	const columns: TableColumnsType = [
		{
			title: "Номер заказа",
			dataIndex: "number",
		},

		{
			title: "Статус",
			dataIndex: "status",
		},
		{
			title: "Дата",
			dataIndex: "date",
		},

		{
			title: "Заказчик",
			dataIndex: "customer",
		},

		{
			title: "Номер телефона",
			dataIndex: "phone",
		},

		{
			title: "E-mail",
			dataIndex: "email",
		},

		{
			title: "Количество позиций",
			dataIndex: "optionsQuantity",
			render(quantity) {
				return <Button type="link">{quantity}</Button>;
			},
		},
	];

	return columns;
};

// {
// 			title: "",
// 			dataIndex: "actions",
// 			render(_, record) {
// 				return <ActionPopover id={record.id} showEditModal={showEditModal} />;
// 			},
// 			width: 70,
// 		},

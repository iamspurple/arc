import type { TableColumnsType } from "antd";

import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { Header } from "@/components/Dashboard/Header";

export default function Order() {
	const columns: TableColumnsType = [
		{
			title: "ID",
			dataIndex: "id",
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
			title: "Сумма",
			dataIndex: "amount",
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
			title: "",
			dataIndex: "actions",
		},
	];

	return (
		<>
			<Header />
			<DataTable columns={columns} />
		</>
	);
}

import { Table } from "antd";
import type { TableColumnsType } from "antd";

import type { Status, ContactWay } from "@prisma/client";

type DataType = {
	key: string;
	id: string;
	customer: string;
	phone: string;
	email: string;
	date: string;
	contactWay: ContactWay;
	status: Status;
	optionsQuantity: number;
}[];

export const DataTable = ({
	columns,
	dataSource,
}: {
	columns: TableColumnsType;
	dataSource: DataType;
}) => {
	return (
		<Table
			scroll={{ y: "70vh", x: undefined }}
			columns={columns}
			dataSource={dataSource}
			pagination={{ showSizeChanger: true }}
		/>
	);
};

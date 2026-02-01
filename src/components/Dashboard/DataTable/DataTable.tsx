"use client";

import { Table } from "antd";
import type { TableColumnsType } from "antd";

export const DataTable = ({
	columns,
	dataSource,
}: {
	columns: TableColumnsType;
	dataSource?: {
		key: string;
		id: string;
		name: string;
		description: string | null;
		composition: string | null;
		care: string | null;
		options: {
			title: string;
			id: string;
		}[];
	}[];
}) => {
	return (
		<div>
			<Table columns={columns} dataSource={dataSource} />
		</div>
	);
};

import { useDashboardActions } from "@/context/DashboardContext";

import { Flex, Button } from "antd";
import type { TableColumnsType } from "antd";

import ActionPopover from "@/components/Dashboard/ActionPopover";

export const Columns = () => {
	const { handleOpenSider } = useDashboardActions();

	const columns: TableColumnsType = [
		{
			title: "ID",
			dataIndex: "id",
		},

		{
			title: "Наименование модели",
			dataIndex: "name",
		},
		{
			title: "Описание",
			dataIndex: "description",
		},

		{
			title: "Состав",
			dataIndex: "composition",
		},

		{
			title: "Уход",
			dataIndex: "care",
		},

		{
			title: "Варианты",
			dataIndex: "options",
			render(options: { title: string; id: string }[]) {
				return (
					<Flex vertical align="flex-start">
						{options.map((option: { title: string; id: string }) => (
							<Button type="link" onClick={() => handleOpenSider(option.id)} key={option.id}>
								{option.title}
							</Button>
						))}
					</Flex>
				);
			},
		},
		{
			title: "",
			dataIndex: "actions",
			render(_, record) {
				return <ActionPopover id={record.id} />;
			},
		},
	];

	return columns;
};

import { useContentSider } from "@/context/ContentSiderContext";

import { Flex, Button } from "antd";
import type { TableColumnsType } from "antd";

import ActionPopover from "@/components/Dashboard/ActionPopover";

export const Columns = (showEditModal: (id: string) => void) => {
	const { handleOpenSider } = useContentSider();

	const columns: TableColumnsType = [
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
			title: "Позиции",
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
				return <ActionPopover id={record.id} showEditModal={showEditModal} />;
			},
			width: 70,
		},
	];

	return columns;
};

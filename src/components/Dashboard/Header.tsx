"use client";

import { Input, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

export const Header = ({
	handleSearch,
	showModal,
}: {
	handleSearch: (value: string) => void;
	showModal: () => void;
}) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				marginBottom: "16px",
				paddingInline: "24px",
			}}
		>
			<Space vertical style={{ width: "35%" }}>
				<Search
					placeholder="Введите запрос"
					allowClear
					enterButton="Найти"
					size="large"
					onSearch={handleSearch}
				/>
			</Space>

			<Button
				type="primary"
				icon={<PlusOutlined />}
				size="large"
				title="Добавить"
				onClick={showModal}
			/>
		</div>
	);
};

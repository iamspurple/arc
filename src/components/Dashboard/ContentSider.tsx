import { CSSProperties } from "react";

import { useProductOptionByIdQuery } from "@/entities/product/api/useProductsQuery";

import { useDashboardData, useDashboardUI, useDashboardActions } from "@/context/DashboardContext";

import { Layout, Flex, Typography, Image, Tag, Collapse, Button } from "antd";

const { Sider } = Layout;

const siderStyle: CSSProperties = {
	color: "#101828",
	backgroundColor: "#fff",
	borderLeft: "1px solid #e4e7ec",
	padding: "24px",
	overflowY: "auto",
	position: "sticky",
	scrollbarWidth: "thin",
	scrollbarGutter: "stable",
};

const tagStyle: CSSProperties = {
	fontSize: 16,
};

const items = [
	{
		key: "1",
		label: (
			<Flex justify="space-between">
				<Tag style={tagStyle}>XS: </Tag>
				<Tag style={tagStyle} color={"blue"}>
					3шт.
				</Tag>
			</Flex>
		),

		children: (
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aliquid veniam, aspernatur
				similique dolor voluptas pariatur, eum magni molestiae ab possimus architecto, unde
				exercitationem sint doloribus animi. Placeat, laborum ad!
			</p>
		),
	},
	{
		key: "2",
		label: (
			<Flex justify="space-between">
				<Tag style={tagStyle}>S: </Tag>
				<Tag style={tagStyle} color={"blue"}>
					3шт.
				</Tag>
			</Flex>
		),
		children: (
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aliquid veniam, aspernatur
				similique dolor voluptas pariatur, eum magni molestiae ab possimus architecto, unde
				exercitationem sint doloribus animi. Placeat, laborum ad!
			</p>
		),
	},
	{
		key: "3",
		label: (
			<Flex justify="space-between">
				<Tag style={tagStyle}>M: </Tag>
				<Tag style={tagStyle} color={"blue"}>
					3шт.
				</Tag>
			</Flex>
		),

		children: (
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aliquid veniam, aspernatur
				similique dolor voluptas pariatur, eum magni molestiae ab possimus architecto, unde
				exercitationem sint doloribus animi. Placeat, laborum ad!
			</p>
		),
	},
];

export const ContentSider = () => {
	const { optionId } = useDashboardData();
	const { isSiderOpen } = useDashboardUI();
	const { handleCloseSider } = useDashboardActions();

	const { data: option, isLoading, isError } = useProductOptionByIdQuery(optionId);

	if (!isSiderOpen) {
		return null;
	}

	return (
		<Sider width={"25%"} style={siderStyle}>
			<Flex vertical>
				<Button onClick={handleCloseSider} style={{ marginBottom: 16 }}>
					Закрыть
				</Button>
				<Flex wrap gap={4} style={{ marginBottom: 16 }}>
					<Image.PreviewGroup>
						<Image alt="img" width={80} height={80} src="/images/tshirt-white-1.jpg" />
						<Image alt="img" width={80} height={80} src="/images/tshirt-white-1.jpg" />
						<Image alt="img" width={80} height={80} src="/images/tshirt-white-1.jpg" />
						<Image alt="img" width={80} height={80} src="/images/tshirt-white-1.jpg" />
						<Image alt="img" width={80} height={80} src="/images/tshirt-white-1.jpg" />
					</Image.PreviewGroup>
				</Flex>
				<Typography.Title level={4}>{option?.title}</Typography.Title>
				<Typography.Text strong>Цена: {option?.price}</Typography.Text>
				<Flex gap={10} align="center">
					<Typography.Text strong>Цвет: {option?.colorName}</Typography.Text>
					<div
						style={{
							width: 15,
							height: 15,
							backgroundColor: option?.hex,
							borderRadius: "50%",
							border: "1px solid #000000be",
						}}
					></div>
				</Flex>

				<Typography.Text strong>Размеры:</Typography.Text>
				<Collapse ghost items={items} expandIconPlacement="end" />
			</Flex>
		</Sider>
	);
};

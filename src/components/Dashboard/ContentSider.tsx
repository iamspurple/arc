import { CSSProperties } from "react";

import {
	useProductOptionByIdQuery,
	useProductSizesQuery,
} from "@/entities/product/api/useProductsQuery";

import { useContentSider } from "@/context/ContentSiderContext";

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

export const ContentSider = () => {
	const { optionId, isSiderOpen, handleCloseSider } = useContentSider();

	const { data: option, isLoading, isError } = useProductOptionByIdQuery(optionId);
	const { data: sizes } = useProductSizesQuery(optionId);

	const sizeItems = sizes
		?.sort((a, b) => a.order - b.order)
		.map((size) => {
			return {
				key: size.id,
				label: (
					<Flex justify="space-between">
						<Tag style={tagStyle}>{size.size} </Tag>
						<Tag style={tagStyle} color={"blue"}>
							{size.quantity}шт.
						</Tag>
					</Flex>
				),

				children: <p>{size.parameters}</p>,
			};
		});

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
				<Collapse ghost items={sizeItems} expandIconPlacement="end" />
			</Flex>
		</Sider>
	);
};

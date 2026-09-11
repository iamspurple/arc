import { CSSProperties } from "react";

import {
	useProductImagesQuery,
	useProductOptionByIdQuery,
	useProductSizesQuery,
} from "@/entities/product/api/useProductsQuery";

import { useContentSider } from "@/context/ContentSiderContext";

import { getProductImagePublicUrl } from "@/lib/productImageUpload";

import {
	Layout,
	Flex,
	Typography,
	Image,
	Tag,
	Collapse,
	Button,
	Divider,
	Empty,
	Skeleton,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const siderStyle: CSSProperties = {
	color: "#101828",
	backgroundColor: "#fff",
	borderLeft: "1px solid #e4e7ec",
	padding: 0,
	overflowY: "auto",
	position: "sticky",
	top: 0,
	height: "100vh",
	scrollbarWidth: "thin",
	scrollbarGutter: "stable",
};

const headerStyle: CSSProperties = {
	position: "sticky",
	top: 0,
	zIndex: 2,
	backgroundColor: "#fff",
	padding: "16px 24px",
	borderBottom: "1px solid #e4e7ec",
};

const bodyStyle: CSSProperties = {
	padding: "20px 24px 32px",
};

const tagStyle: CSSProperties = {
	fontSize: 15,
	margin: 0,
	padding: "2px 10px",
	borderRadius: 8,
};

export const ContentSider = () => {
	const { optionId, isSiderOpen, handleCloseSider } = useContentSider();

	const { data: option, isLoading, isError } = useProductOptionByIdQuery(optionId);
	const { data: sizes } = useProductSizesQuery(optionId);
	const { data: images } = useProductImagesQuery(optionId);

	const sizeItems = sizes
		?.sort((a, b) => a.order - b.order)
		.map((size) => {
			return {
				key: size.id,
				label: (
					<Flex justify="space-between" align="center" style={{ width: "100%" }}>
						<Tag style={tagStyle}>{size.size}</Tag>
						<Tag style={tagStyle} color="blue">
							{size.quantity} шт.
						</Tag>
					</Flex>
				),

				children: (
					<Typography.Paragraph type="secondary" style={{ margin: 0 }}>
						{size.parameters || "—"}
					</Typography.Paragraph>
				),
			};
		});

	if (!isSiderOpen) {
		return null;
	}

	return (
		<Sider width={"25%"} style={siderStyle}>
			<Flex align="center" justify="space-between" style={headerStyle}>
				<Typography.Text strong style={{ fontSize: 16 }}>
					Информация о товаре
				</Typography.Text>
				<Button
					type="text"
					shape="circle"
					icon={<CloseOutlined />}
					onClick={handleCloseSider}
					aria-label="Закрыть"
				/>
			</Flex>

			<div style={bodyStyle}>
				{isLoading ? (
					<Skeleton active avatar paragraph={{ rows: 6 }} />
				) : isError ? (
					<Empty description="Не удалось загрузить товар" />
				) : (
					<Flex vertical gap={16}>
						{images && images.length > 0 && (
							<Flex wrap gap={8}>
								<Image.PreviewGroup>
									{images.map((image) => (
										<Image
											key={image.id}
											alt="img"
											width={84}
											height={84}
											style={{
												objectFit: "cover",
												borderRadius: 10,
												border: "1px solid #e4e7ec",
											}}
											src={getProductImagePublicUrl(image.id)}
										/>
									))}
								</Image.PreviewGroup>
							</Flex>
						)}

						<Flex vertical gap={4}>
							<Typography.Title level={4} style={{ margin: 0 }}>
								{option?.title}
							</Typography.Title>
							<Typography.Text style={{ fontSize: 18, fontWeight: 600, color: "#101828" }}>
								{option?.price} ₽
							</Typography.Text>
						</Flex>

						<Flex gap={10} align="center">
							<Typography.Text type="secondary">Цвет</Typography.Text>
							<Flex gap={8} align="center">
								<div
									style={{
										width: 16,
										height: 16,
										backgroundColor: option?.hex,
										borderRadius: "50%",
										border: "1px solid #d0d5dd",
									}}
								/>
								<Typography.Text strong>{option?.colorName}</Typography.Text>
							</Flex>
						</Flex>

						<Divider style={{ margin: "4px 0" }} />

						<Flex vertical gap={8}>
							<Typography.Text strong style={{ fontSize: 15 }}>
								Размеры
							</Typography.Text>
							{sizeItems && sizeItems.length > 0 ? (
								<Collapse ghost items={sizeItems} expandIconPlacement="end" />
							) : (
								<Typography.Text type="secondary">Нет доступных размеров</Typography.Text>
							)}
						</Flex>
					</Flex>
				)}
			</div>
		</Sider>
	);
};

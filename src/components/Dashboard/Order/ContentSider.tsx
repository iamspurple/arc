import { useContentSider } from "@/context/ContentSiderContext";
import {
	useOrderByIdQuery,
	useOrderProductOptionsByOrderIdQuery,
} from "@/entities/order/api/useOrdersQuery";
import {
	useProductImagesAllQuery,
	useProductsQuery,
	useProductOptionsQuery,
	useProductSizesAllQuery,
} from "@/entities/product/api/useProductsQuery";

import { Typography, Image, Button, Layout, Flex, Tag, Empty } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { CSSProperties } from "react";

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

const cardStyle: CSSProperties = {
	border: "1px solid #e4e7ec",
	borderRadius: 12,
	padding: 12,
	backgroundColor: "#fff",
};

const { Sider } = Layout;

export const ContentSider = () => {
	const { isOrderSiderOpen, orderId, handleCloseOrderSider } = useContentSider();

	const { data: order } = useOrderByIdQuery(orderId);

	const { data: orderOptions } = useOrderProductOptionsByOrderIdQuery(orderId);

	const { data: products } = useProductsQuery();
	const { data: options, isLoading, isError } = useProductOptionsQuery();
	const { data: images } = useProductImagesAllQuery();
	const { data: sizes } = useProductSizesAllQuery();

	const items = useMemo(() => {
		return options?.map((option) => {
			return {
				id: option.id,
				productName: products?.find((product) => product.id === option.productId)?.name as string,
				optionName: option.title,
				article: option.article,
				image: images?.filter((image) => image.optionId === option.id)[0].id as string,
			};
		});
	}, [products, options, images]);

	const orderItems = useMemo(() => {
		return orderOptions?.map((orderOption) => {
			const item = items?.find((i) => i.id === orderOption.optionId);
			const size = sizes?.find((s) => s.id === orderOption.sizeId);
			return {
				...item,
				quantity: orderOption.quantity,
				size: size?.size,
			};
		});
	}, [orderOptions, items, sizes]);

	const totalQuantity = useMemo(
		() => orderItems?.reduce((sum, item) => sum + (item.quantity ?? 0), 0) ?? 0,
		[orderItems],
	);

	if (!isOrderSiderOpen) {
		return null;
	}

	return (
		<Sider width={"25%"} style={siderStyle}>
			<Flex align="center" justify="space-between" style={headerStyle}>
				<Flex vertical>
					<Typography.Text type="secondary" style={{ fontSize: 12 }}>
						Заказ
					</Typography.Text>
					<Typography.Text strong style={{ fontSize: 16 }}>
						№ {order?.number}
					</Typography.Text>
				</Flex>
				<Button
					type="text"
					shape="circle"
					icon={<CloseOutlined />}
					onClick={handleCloseOrderSider}
					aria-label="Закрыть"
				/>
			</Flex>

			<div style={bodyStyle}>
				{isError ? (
					<Empty description="Не удалось загрузить заказ" />
				) : orderItems && orderItems.length > 0 ? (
					<Flex vertical gap={12}>
						<Flex justify="space-between" align="center">
							<Typography.Text type="secondary">
								Товаров: {orderItems.length}
							</Typography.Text>
							<Tag color="blue" style={{ margin: 0, borderRadius: 8 }}>
								Всего {totalQuantity} шт.
							</Tag>
						</Flex>

						{orderItems.map((item) => (
							<Flex key={item.id} gap={12} style={cardStyle}>
								<Image
									width={56}
									height={56}
									src={`/static/products/${item?.image}`}
									alt={`${item?.productName} ${item?.optionName}`}
									preview={false}
									style={{
										objectFit: "cover",
										borderRadius: 8,
										border: "1px solid #e4e7ec",
										flexShrink: 0,
									}}
								/>

								<Flex vertical gap={2} style={{ minWidth: 0, flex: 1 }}>
									<Flex justify="space-between" align="baseline" gap={8}>
										<Typography.Text strong ellipsis>
											{item?.productName}
										</Typography.Text>
										<Typography.Text type="secondary" style={{ fontSize: 12, flexShrink: 0 }}>
											{item?.article}
										</Typography.Text>
									</Flex>
									<Typography.Text type="secondary" ellipsis>
										{item?.optionName}
									</Typography.Text>
									<Flex gap={6} style={{ marginTop: 4 }}>
										<Tag style={{ margin: 0, borderRadius: 8 }}>Размер: {item.size}</Tag>
										<Tag style={{ margin: 0, borderRadius: 8 }}>{item.quantity} шт.</Tag>
									</Flex>
								</Flex>
							</Flex>
						))}
					</Flex>
				) : (
					<Empty description="В заказе нет товаров" />
				)}
			</div>
		</Sider>
	);
};

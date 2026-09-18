"use client";

import { useProductOptionsQuery } from "@/entities/product/api/useProductsQuery";
import { useOrdersQuery } from "@/entities/order/api/useOrdersQuery";

import React, { useMemo } from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
	AppstoreOutlined,
	ProfileOutlined,
	CalendarOutlined,
	BellOutlined,
} from "@ant-design/icons";
import { Status } from "@prisma/client";

const ACCENT_COLOR = "#1677ff";

export const StatisticData = () => {
	const { data: options } = useProductOptionsQuery();
	const { data: orders } = useOrdersQuery();

	const ordersThisMonth = useMemo(() => {
		if (!orders) return 0;
		const now = new Date();
		return orders.filter((order) => {
			const createdAt = new Date(order.createdAt);
			return (
				createdAt.getFullYear() === now.getFullYear() && createdAt.getMonth() === now.getMonth()
			);
		}).length;
	}, [orders]);

	const newOrders = useMemo(() => {
		if (!orders) return 0;
		return orders.filter((order) => order.status === Status.NEW).length;
	}, [orders]);

	const cards = [
		{
			title: "Общее количество товаров",
			value: options?.length,
			icon: <AppstoreOutlined />,
		},
		{
			title: "Общее количество заказов",
			value: orders?.length,
			icon: <ProfileOutlined />,
		},
		{
			title: "Заказов за этот месяц",
			value: ordersThisMonth,
			icon: <CalendarOutlined />,
		},
		{
			title: "Новые заказы",
			value: newOrders,
			icon: <BellOutlined />,
		},
	];

	return (
		<Row gutter={[16, 16]} style={{ padding: 24 }}>
			{cards.map((card) => (
				<Col key={card.title} xs={24} sm={12} lg={6}>
					<Card variant="borderless">
						<Statistic
							title={
								<span style={{ fontSize: 16 }}>
									<span style={{ color: ACCENT_COLOR, marginRight: 8 }}>{card.icon}</span>
									{card.title}
								</span>
							}
							value={card.value}
							styles={{ content: { color: ACCENT_COLOR, fontWeight: 600, fontSize: 36 } }}
						/>
					</Card>
				</Col>
			))}
		</Row>
	);
};

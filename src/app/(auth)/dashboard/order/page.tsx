"use client";

import type { TableColumnsType } from "antd";
import { Modal } from "antd";

import { Loading } from "@/components/Dashboard/Loading";
import { Error } from "@/components/Dashboard/Error";

import { useMemo, useState } from "react";
import { useOrdersQuery, useOrderProductOptionsQuery } from "@/entities/order/api/useOrdersQuery";

import { DataTable } from "@/components/Dashboard/Order/DataTable/DataTable";
import { Header } from "@/components/Dashboard/Header";
import { Columns } from "@/components/Dashboard/Order/DataTable/Columns";
import { ModalForm } from "@/components/Dashboard/Order/ModalForm/ModalForm";

export default function Order() {
	const [orderId, setOrderId] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showEditModal = (id: string) => {
		setIsModalOpen(true);
		setOrderId(id);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const columns: TableColumnsType = Columns(showEditModal);

	const { data: orders = [], isLoading, isError } = useOrdersQuery();
	const { data: orderProductOptions = [] } = useOrderProductOptionsQuery();

	const data = useMemo(
		() =>
			orders
				.filter((order) => order.customer.toLowerCase().includes(search.toLowerCase()))
				.map((order) => ({
					number: order.number,
					key: order.id,
					id: order.id,
					customer: order.customer,
					phone: order.phone,
					email: order.email,
					date: order.createdAt.toLocaleDateString(),
					contactWay: order.contactWay,
					status: order.status,
					optionsQuantity: orderProductOptions.filter((option) => option.orderId === order.id)
						.length,
				})),
		[orders, search, orderProductOptions]
	);

	if (isLoading) return <Loading />;
	if (isError) return <Error />;

	return (
		<>
			<Header handleSearch={(value) => setSearch(value)} showModal={showModal} />
			<DataTable columns={columns} dataSource={data} />
			<Modal
				width={800}
				loading={isLoading}
				footer={null}
				open={isModalOpen}
				onCancel={handleCancel}
				destroyOnHidden
			>
				<ModalForm externalOrderId={orderId || undefined} />
			</Modal>
		</>
	);
}

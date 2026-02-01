"use client";

import { useMemo, useState } from "react";
import { useProductsQuery, useProductOptionsQuery } from "@/entities/product/api/useProductsQuery";

import { useDashboardUI, useDashboardActions } from "@/context/DashboardContext";

import { Modal } from "antd";

import { Columns } from "@/components/Dashboard/DataTable/Columns";
import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { Error } from "@/components/Dashboard/Error";
import { Header } from "@/components/Dashboard/Header";
import { Loading } from "@/components/Dashboard/Loading";
import { ModalForm } from "@/components/Dashboard/ModalForm/ModalForm";

export default function Product() {
	const [search, setSearch] = useState("");
	const { isModalOpen } = useDashboardUI();
	const { handleCancel } = useDashboardActions();

	const columns = Columns();

	const { data: products = [], isLoading, isError } = useProductsQuery();
	const { data: options = [] } = useProductOptionsQuery();

	const data = useMemo(
		() =>
			products
				.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
				.map((p) => ({
					key: p.id,
					id: p.id,
					name: p.name,
					description: p.description,
					composition: p.composition,
					care: p.care,
					options: options
						.filter((o) => o.productId == p.id)
						.map((o) => ({ title: o.title, id: o.id })),
				})),
		[products, options, search]
	);

	if (isLoading) return <Loading />;
	if (isError) return <Error />;

	return (
		<>
			<Header handleSearch={(value) => setSearch(value)} />
			<DataTable columns={columns} dataSource={data} />
			<Modal footer={null} open={isModalOpen} onCancel={handleCancel}>
				<ModalForm />
			</Modal>
		</>
	);
}

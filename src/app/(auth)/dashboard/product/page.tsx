"use client";

import { useMemo, useState } from "react";
import { useProductsQuery, useProductOptionsQuery } from "@/entities/product/api/useProductsQuery";

import { Modal } from "antd";

import { Columns } from "@/components/Dashboard/DataTable/Columns";
import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { Error } from "@/components/Dashboard/Error";
import { Header } from "@/components/Dashboard/Header";
import { Loading } from "@/components/Dashboard/Loading";
import { ModalForm } from "@/components/Dashboard/ModalForm/ModalForm";
import { CloseConfirm } from "@/components/Dashboard/CloseConfirm";

import { useFormValues } from "@/lib/useFormValues";

export default function Product() {
	const [productId, setProductId] = useState<string | null>(null);
	const { formValues, isLoading: isFormValuesLoading } = useFormValues(productId ?? "");

	const [search, setSearch] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	const showEditModal = (productId: string) => {
		setIsModalOpen(true);
		setProductId(productId);
	};

	const showModal = () => {
		setIsModalOpen(true);
		setProductId(null);
	};

	const handleCancel = () => {
		setIsConfirmOpen(true);
	};

	const handleCloseConfirm = () => {
		setIsConfirmOpen(false);
	};

	const handleCloseAll = () => {
		setIsModalOpen(false);
		setIsConfirmOpen(false);
		setProductId(null);
	};

	const columns = Columns(showEditModal);

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
			<Header handleSearch={(value) => setSearch(value)} showModal={showModal} />
			<DataTable columns={columns} dataSource={data} />

			<Modal
				loading={isFormValuesLoading}
				footer={null}
				open={isModalOpen}
				onCancel={handleCancel}
				destroyOnHidden
				width={550}
			>
				<ModalForm
					key={productId || "create"}
					formValues={formValues}
					isLoading={isFormValuesLoading}
					productId={productId || undefined}
					handleClose={handleCloseAll}
				/>
			</Modal>
			{isConfirmOpen && (
				<CloseConfirm
					isConfirmOpen={isConfirmOpen}
					handleCloseAll={handleCloseAll}
					handleCloseConfirm={handleCloseConfirm}
				/>
			)}
		</>
	);
}

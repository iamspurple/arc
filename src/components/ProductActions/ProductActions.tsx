"use client";

import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import SizePicker from "@/components/SizePicker/SizePicker";
import { useState } from "react";
import style from "./ProductActions.module.scss";
import { CatalogItem } from "@/entities/catalog";

type Props = {
	product: CatalogItem;
};

const ProductActions = ({ product }: Props) => {
	const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
	const [showSizeError, setShowSizeError] = useState(false);

	const handleSizeChange = (sizeId: string | null) => {
		setSelectedSizeId(sizeId);
		setShowSizeError(false);
	};

	const handleNoSize = () => {
		setShowSizeError(true);
	};

	return (
		<div className={style.product_actions}>
			<SizePicker sizes={product.sizes} onSizeChange={handleSizeChange} />
			{showSizeError && <span className={style.error}>Выберите размер</span>}
			<AddToCartButton product={product} selectedSizeId={selectedSizeId} onNoSize={handleNoSize} />
		</div>
	);
};

export default ProductActions;

"use client";

import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import SizePicker from "@/components/SizePicker/SizePicker";
import { useState } from "react";
import "./ProductActions.scss";

type Props = {
	product: {
		id: string;
		slug: string;
		title: string;
		price: number;
		inStock: boolean;
		sizes: string | null;
		images?: { url: string }[];
	};
};

const ProductActions = ({ product }: Props) => {
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [showSizeError, setShowSizeError] = useState(false);

	const handleSizeChange = (size: string | null) => {
		setSelectedSize(size);
		setShowSizeError(false);
	};

	const handleNoSize = () => {
		setShowSizeError(true);
	};

	return (
		<div className="product-actions">
			<SizePicker sizes={product.sizes} onSizeChange={handleSizeChange} />
			{showSizeError && <span className="product-actions__error">Выберите размер</span>}
			<AddToCartButton product={product} selectedSize={selectedSize} onNoSize={handleNoSize} />
		</div>
	);
};

export default ProductActions;

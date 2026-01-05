"use client";

import { useState } from "react";
import style from "./SizePicker.module.scss";

type SizePickerProps = {
	sizes: string | null;
	onSizeChange?: (size: string | null) => void;
};

const SizePicker = ({ sizes, onSizeChange }: SizePickerProps) => {
	const availableSizes = sizes
		?.split(",")
		.map((size) => size.trim())
		.filter(Boolean);

	const [selectedSize, setSelectedSize] = useState<string | null>(null);

	const handleSizeSelect = (size: string) => {
		const newSize = selectedSize === size ? null : size;
		setSelectedSize(newSize);
		onSizeChange?.(newSize);
	};

	if (availableSizes?.length === 0) {
		return null;
	}

	return (
		<div className={style.size_picker}>
			<div className={style.label}>Размер:</div>
			<div className={style.options}>
				{availableSizes?.map((size) => (
					<button
						key={size}
						type="button"
						className={`${style.option} ${selectedSize === size ? style.option__selected : ""}`}
						onClick={() => handleSizeSelect(size)}
					>
						{size}
					</button>
				))}
			</div>
		</div>
	);
};

export default SizePicker;

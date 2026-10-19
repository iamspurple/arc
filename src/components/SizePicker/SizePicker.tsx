"use client";

import { useState } from "react";
import style from "./SizePicker.module.scss";
import { CatalogItem } from "@/entities/catalog";

type SizePickerProps = {
	onSizeChange?: (size: string | null) => void;
} & Pick<CatalogItem, "sizes">;

const SizePicker = ({ sizes, onSizeChange }: SizePickerProps) => {
	const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);

	const handleSizeSelect = (sizeId: string) => {
		const newSizeId = selectedSizeId === sizeId ? null : sizeId;
		setSelectedSizeId(newSizeId);
		onSizeChange?.(newSizeId);
	};

	if (sizes?.length === 0) {
		return null;
	}

	return (
		<div className={style.size_picker}>
			<div className={style.label}>Размер:</div>
			<div className={style.options}>
				{sizes?.map((size) => (
					<button
						key={size.id}
						type="button"
						className={`${style.option} ${selectedSizeId === size.id ? style.option__selected : ""}`}
						onClick={() => handleSizeSelect(size.id)}
					>
						{size.size}
					</button>
				))}
			</div>
		</div>
	);
};

export default SizePicker;

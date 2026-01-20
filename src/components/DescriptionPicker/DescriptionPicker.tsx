"use client";

import { useState } from "react";
import style from "./DescriptionPicker.module.scss";

type DescriptionPickerTypes = {
	description: string | null;
	composition: string | null;
	care: string | null;
};

const DescriptionPicker = ({ description, composition, care }: DescriptionPickerTypes) => {
	const options = ["Описание", "Состав и уход", "Размерные характерисики"];

	const [selectedOption, setSelectedOption] = useState<string>("Описание");

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option);
	};

	const renderContent = () => {
		if (!selectedOption) return null;

		switch (selectedOption) {
			case "Описание":
				return (
					description && (
						<div className={style.content_section}>
							<p className={style.text}>{description}</p>
						</div>
					)
				);

			case "Состав и уход":
				return (
					<div className={style.content_section}>
						{composition && (
							<div className={style.subsection}>
								<h3 className={style.subsection_title}>Состав</h3>
								<p className={style.text}>{composition}</p>
							</div>
						)}
						{care && (
							<div className={style.subsection}>
								<h3 className={style.subsection_title}>Уход</h3>
								<p className={style.text}>{care}</p>
							</div>
						)}
						{!composition && !care && <p className={style.text}>Информация отсутствует</p>}
					</div>
				);

			case "Размерные характерисики":
				return (
					<div className={style.content_section}>
						<p className={style.text}>Размерные характеристики отсутствуют</p>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className={style.descr_picker}>
			<div className={style.options}>
				{options.map((option) => (
					<button
						key={option}
						className={`${style.option} ${selectedOption === option ? style.option__selected : ""}`}
						onClick={() => handleOptionSelect(option)}
					>
						{option}
					</button>
				))}
			</div>
			{renderContent()}
		</div>
	);
};

export default DescriptionPicker;

"use client";

import { useState } from "react";
import "./DescriptionPicker.scss";

type DescriptionPickerTypes = {
	description: string | null;
	composition: string | null;
	care: string | null;
};

const DescriptionPicker = ({ description, composition, care }: DescriptionPickerTypes) => {
	const options = ["Описание", "Состав и уход", "Размерные характерисики"];

	const [selectedOption, setSelectedOption] = useState<string | null>("Описание");

	const handleOptionSelect = (option: string) => {
		const newOption = selectedOption === option ? null : option;
		setSelectedOption(newOption);
	};

	const renderContent = () => {
		if (!selectedOption) return null;

		switch (selectedOption) {
			case "Описание":
				return (
					description && (
						<div className="content-section">
							<p className="text">{description}</p>
						</div>
					)
				);

			case "Состав и уход":
				return (
					<div className="content-section">
						{composition && (
							<div className="subsection">
								<h3 className="subsection-title">Состав</h3>
								<p className="text">{composition}</p>
							</div>
						)}
						{care && (
							<div className="subsection">
								<h3 className="subsection-title">Уход</h3>
								<p className="text">{care}</p>
							</div>
						)}
						{!composition && !care && <p className="text text--empty">Информация отсутствует</p>}
					</div>
				);

			case "Размерные характерисики":
				return (
					<div className="content-section">
						<p className="text text--empty">Размерные характеристики отсутствуют</p>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="descr-picker">
			<div className="options">
				{options.map((option) => (
					<button
						key={option}
						className={`option ${selectedOption === option ? "option--selected" : ""}`}
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

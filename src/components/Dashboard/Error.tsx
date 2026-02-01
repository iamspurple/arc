import { Alert } from "antd";

export const Error = () => {
	return (
		<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Alert
				title="Ошибка"
				description="Что-то пошло не так, попробуйте перезагрузить страницу."
				type="error"
				showIcon
			/>
		</div>
	);
};

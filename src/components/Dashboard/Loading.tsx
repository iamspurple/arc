import { Spin } from "antd";

const contentStyle: React.CSSProperties = {
	padding: 50,
	background: "rgba(0, 0, 0, 0.05)",
	borderRadius: 4,
};

const content = <div style={contentStyle} />;

export const Loading = () => {
	return (
		<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Spin size="large" tip="Загрузка">
				{content}
			</Spin>
		</div>
	);
};

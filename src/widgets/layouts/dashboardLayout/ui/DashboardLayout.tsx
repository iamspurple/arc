"use client";
import { CSSProperties } from "react";
import { Layout } from "antd";
import { DashboardSider } from "./DashboardSider";

const { Content } = Layout;

const layoutStyle = {
	overflow: "hidden",
	width: "100%",
	maxWidth: "100%",
	height: "100svh",
	backgroundColor: "#F9FBFC",
};

const contentStyle: CSSProperties = {
	minHeight: "100%",
	color: "black",
	backgroundColor: "#F9FBFC",
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Layout style={layoutStyle}>
			<DashboardSider />
			<Layout>
				<Content style={contentStyle}>{children}</Content>
			</Layout>
		</Layout>
	);
};

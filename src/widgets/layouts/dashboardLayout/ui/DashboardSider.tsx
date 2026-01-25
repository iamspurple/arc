import { CSSProperties } from "react";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { DASHBOARD_ROUTES_MENU_CONFIG } from "@/shared/config/routes";

const { Sider } = Layout;

const siderStyle: CSSProperties = {
	color: "#101828",
	backgroundColor: "#FFFFFF",
	borderRight: "1px solid #e4e7ec",
};

export const DashboardSider = () => {
	return (
		<Sider breakpoint="lg" style={siderStyle}>
			<div style={{ padding: "32px 20px" }}>
				<h3>ARC</h3>
			</div>
			<Menu
				theme="light"
				mode="inline"
				defaultSelectedKeys={["/dashboard"]}
				items={DASHBOARD_ROUTES_MENU_CONFIG.map((item) => ({
					key: item.href,
					label: item.label,
					href: item.href,
					icon: (
						<Link href={item.href}>
							<item.icon />
						</Link>
					),
				}))}
			/>
		</Sider>
	);
};
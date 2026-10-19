"use client";

import { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu } from "antd";
import { DASHBOARD_ROUTES_MENU_CONFIG } from "@/shared/config/routes";
import { LogoutBtn } from "@/widgets/logout"
import styles from "./dashboardSidebar.module.scss";

const { Sider } = Layout;

const siderStyle: CSSProperties = {
	color: "#101828",
	backgroundColor: "#FFFFFF",
	borderRight: "1px solid #e4e7ec",
	position: "sticky",
	top: 0,
	height: "100vh",
};

export const DashboardSidebar = () => {
	const pathname = usePathname();
	const selectedKeys = DASHBOARD_ROUTES_MENU_CONFIG.filter(
		(item) => item.href === pathname,
	).map((item) => item.href);

	return (
		<Sider breakpoint="lg" style={siderStyle}>
			<div className={styles.SidebarHeader}>
				<h3>ARC</h3>
				<LogoutBtn />
			</div>
			<Menu
				theme="light"
				mode="inline"
				selectedKeys={selectedKeys}
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

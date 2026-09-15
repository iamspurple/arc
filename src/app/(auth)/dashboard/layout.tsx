import { DashboardLayout as DashboardLayoutWrapper } from "@/widgets/layouts";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}

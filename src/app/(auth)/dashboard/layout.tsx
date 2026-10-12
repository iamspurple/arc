import { DashboardLayout as DashboardLayoutWrapper } from "@/widgets/layouts";
import { NextAuthProvider } from "@/providers/next-auth-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	return (
		<NextAuthProvider session={session}>
			<DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
		</NextAuthProvider>
	);
}

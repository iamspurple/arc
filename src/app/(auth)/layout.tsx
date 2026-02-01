import { AntdRegistry } from "@ant-design/nextjs-registry";

import { TanStackProvider } from "@/providers/tanstack-provider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<TanStackProvider>
			<AntdRegistry>{children}</AntdRegistry>
		</TanStackProvider>
	);
}

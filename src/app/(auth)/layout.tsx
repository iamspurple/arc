import { AntdRegistry } from "@ant-design/nextjs-registry";

import { TanStackProvider } from "@/providers/tanstack-provider";
import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<TanStackProvider>
				<AntdRegistry>{children}</AntdRegistry>
			</TanStackProvider>
		</Suspense>
	);
}

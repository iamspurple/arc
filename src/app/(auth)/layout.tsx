import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <AntdRegistry>{children}</AntdRegistry>;
}

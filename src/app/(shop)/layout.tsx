import { ShopLayout as ShopLayoutWrapper } from "@/widgets/layouts";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
	return <ShopLayoutWrapper>{children}</ShopLayoutWrapper>;
}

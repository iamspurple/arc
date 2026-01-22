import { CartProvider } from "@/context/CartContext";
import Cart from "@/components/Cart/Cart";
import Menu from "@/components/Menu/Menu";
import { Header } from "@/components/Header";

export const ShopLayout = ({
	children
}: { children: React.ReactNode }) => {
	return (
		<CartProvider>
			<Header />
			<main className="main-content">{children}</main>
			<Cart />
			<Menu />
		</CartProvider>
	);
}

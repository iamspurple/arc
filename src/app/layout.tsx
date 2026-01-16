// app/layout.tsx
import { CartProvider } from "@/context/CartContext";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import type { Metadata } from "next";
import { Lunasima } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";

const lunasima = Lunasima({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "700"],
	variable: "--font-lunasima",
});

const athelas = localFont({
	src: [
		{
			path: "../../public/fonts/athelas/Athelas-Regular.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-athelas-regular",
});

export const metadata: Metadata = {
	title: "arc",
	description: "clothing brand",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<body className={`${lunasima.variable} ${athelas.variable}`} suppressHydrationWarning>
				<CartProvider>
					<LayoutWrapper>{children}</LayoutWrapper>
				</CartProvider>
			</body>
		</html>
	);
}

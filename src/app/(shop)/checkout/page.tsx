import { Metadata } from "next";
import { Checkout } from "./Checkout";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Корзина | arc";
	const description = "Оформление заявки на заказ.";

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
		},
	};
}

const CheckoutWrapperPage = () => {
	return <Checkout />;
};

export default CheckoutWrapperPage;

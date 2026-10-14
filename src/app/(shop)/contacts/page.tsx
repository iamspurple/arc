import style from "./contacts.module.scss";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Контакты | arc";
	const description =
		"Если у вас возникнут вопросы или сложности с заказом, пожалуйста, свяжитесь с нами.";

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

const Page = () => {
	return (
		<div className={style.contacts_page}>
			<h1 className={style.contacts_page__title}>Контакты</h1>

			<div className={style.contacts_page__content}>
				<p className={style.contacts_page__content_subtitle}>
					Если у вас возникнут вопросы или сложности с заказом, пожалуйста, свяжитесь с нами.
				</p>

				<p>
					E-mail: <Link href="mailto:arc@gmail.com">arc@gmail.com</Link>
				</p>

				<p>Telegram:</p>

				<p>
					Также вы можете связаться с нами в <Link href="https://t.me/xxx">direct message</Link>
				</p>
			</div>
		</div>
	);
};

export default Page;

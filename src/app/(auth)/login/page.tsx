import Link from "next/link";
import { DASHBOARD_ROUTES } from "@/shared/config/routes";

export default function Login() {
	return (
		<>
			<h3>Страница входа в панель управления</h3>
			<Link href={DASHBOARD_ROUTES.main}>Войти</Link>
		</>
	);
}

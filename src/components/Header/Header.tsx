// components/Header/Header.tsx
import Link from "next/link";
import CartButton from "./CartButton";
import "./Header.scss";

const Header = () => {
	return (
		<header className="header">
			<nav className="header__nav">
				<div className="header__left">
					<Link href="/catalog" className="header__link">
						Каталог
					</Link>
					<Link href="/about" className="header__link">
						О проекте
					</Link>
				</div>

				<div className="header__center">
					<Link href="/" className="header__logo">
						arc
					</Link>
				</div>

				<div className="header__right">
					<Link href="/delivery" className="header__link">
						Доставка
					</Link>
					<Link href="/contacts" className="header__link">
						Контакты
					</Link>
					<CartButton />
				</div>
			</nav>
		</header>
	);
};

export default Header;

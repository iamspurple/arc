// components/Header/Header.tsx
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.header__nav}>
				<div className={styles.header__left}>
					<Link href="/catalog" className={styles.header__link}>
						Каталог
					</Link>
					<Link href="/about" className={styles.header__link}>
						О проекте
					</Link>
				</div>

				<div className={styles.header__center}>
					<Link href="/" className={styles.header__logo}>
						arc
					</Link>
				</div>

				<div className={styles.header__right}>
					<Link href="/delivery" className={styles.header__link}>
						Доставка
					</Link>
					<Link href="/contacts" className={styles.header__link}>
						Контакты
					</Link>
					<button
						type="button"
						className={styles.header__link}
						style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
					>
						Корзина
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;

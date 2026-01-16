"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./Header.module.scss";
import { useCart } from "@/context/CartContext";
import useMediaQuery from "@/services/useMediaQuery";
import Image from "next/image";

const CartButton = dynamic(() => import("./CartButton"), { ssr: false });

const Header = () => {
	const { openMenu } = useCart();

	const matches = useMediaQuery("(max-width: 768px)");

	return (
		<header className={styles.header}>
			{matches ? (
				<div className={styles.header__nav}>
					<button onClick={openMenu} className={styles.menu_btn}>
						<Image src="/burger.svg" alt="open menu" fill />{" "}
					</button>
					<Link href="/" className={styles.header__logo}>
						arc
					</Link>
					<CartButton />
				</div>
			) : (
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
						<CartButton />
					</div>
				</nav>
			)}
		</header>
	);
};

export default Header;

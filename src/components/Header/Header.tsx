"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useCart } from "@/context/CartContext";
import { useMediaQuery } from "@/services/useMediaQuery";
import { routes } from "@/constants/routes";

import styles from "./Header.module.scss";

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
					<Link href={routes.home} className={styles.header__logo}>
						arc
					</Link>
					<CartButton />
				</div>
			) : (
				<nav className={styles.header__nav}>
					<div className={styles.header__left}>
						<Link href={routes.catalog} className={styles.header__link}>
							Каталог
						</Link>
						<Link href={routes.about} className={styles.header__link}>
							О проекте
						</Link>
					</div>

					<div className={styles.header__center}>
						<Link href={routes.home} className={styles.header__logo}>
							arc
						</Link>
					</div>

					<div className={styles.header__right}>
						<Link href={routes.delivery} className={styles.header__link}>
							Доставка
						</Link>
						<Link href={routes.contacts} className={styles.header__link}>
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

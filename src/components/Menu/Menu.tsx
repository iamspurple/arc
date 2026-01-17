"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { routes } from "@/constants/routes";

import style from "./Menu.module.scss";

const Menu = () => {
	const { closeMenu, isMenuOpen } = useCart();
	const [isClosing, setIsClosing] = useState(false);
	const timerID = useRef<NodeJS.Timeout | null>(null);
	const handleClose = () => {
		setIsClosing(true);
		timerID.current = setTimeout(() => {
			closeMenu();
			setIsClosing(false);
		}, 300);
	};

	useEffect(() => {
		return () => {
			if (timerID.current) {
				clearTimeout(timerID.current);
			}
		};
	}, []);

	if (!isMenuOpen) return null;

	return (
		<>
			<div
				className={`${style.overlay} ${isClosing ? style.overlay_closing : ""}`}
				onClick={handleClose}
			></div>
			<div className={`${style.menu} ${isClosing ? style.menu_closing : ""}`}>
				<div className={style.header}>
					<span className={style.title}>Меню</span>
					<button className={style.close_btn} onClick={handleClose}>
						×
					</button>
				</div>
				<nav>
					<ul className={style.list}>
						<li className={style.item}>
							<Link href={routes.catalog} className={style.link} onClick={handleClose}>
								Каталог
							</Link>
						</li>
						<li className={style.item}>
							<Link href={routes.about} className={style.link} onClick={handleClose}>
								О проекте
							</Link>
						</li>
						<li className={style.item}>
							<Link href={routes.delivery} className={style.link} onClick={handleClose}>
								Доставка
							</Link>
						</li>
						<li className={style.item}>
							<Link href={routes.contacts} className={style.link} onClick={handleClose}>
								Контакты
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Menu;

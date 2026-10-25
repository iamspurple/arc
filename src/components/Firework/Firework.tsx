"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import styles from "./Firework.module.css";
import { useCartActions } from "@/context/CartContext";
import { OrderCreateEntity } from "@/entities/order/types/order";

interface OrderSuccessProps {
	orderNumber: string;
	title: string;
	description: string;
	seconds?: number;
	redirectTo: string;
	contactWay: OrderCreateEntity["contactWay"];
	botName: string
}

const ContactWayInfo = ({ contactWay }: { contactWay: OrderCreateEntity["contactWay"] }) => {
	switch (contactWay) {
		case "EMAIL":
		case "WHATSAPP":
		case "TELEGRAM":
			return (
				<p className={styles.description}>
					Для отслеживания статуса заказа Вы можете воспользоваться нашим ботом в телеграм. Напишите
					ему номер вашего заказа{" "}
				</p>
			);
	}
};

export const Firework = ({
	orderNumber,
	title,
	description,
	redirectTo,
	seconds = 59,
	contactWay,
	botName,
}: OrderSuccessProps) => {
	const { clearCart } = useCartActions();
	const [closeTimer, setCloseTimer] = useState(() => seconds);
	const router = useRouter();

	useEffect(() => {
		confetti({
			particleCount: 150,
			spread: 80,
			origin: { y: 0.6 },
		});
	}, []);

	useEffect(() => {
		if (closeTimer <= 0) {
			clearCart();
			router.push(redirectTo);
			return;
		}

		const timerId = setInterval(() => {
			setCloseTimer((prev) => prev - 1);
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, [closeTimer, router, redirectTo]);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.icon}>🎉</div>

				<h1 className={styles.title}>{title}</h1>
				<p className={styles.description}>{description}</p>
				<ContactWayInfo contactWay={contactWay} />

				<div className={styles.orderBadge}>
					<p className={styles.badgeLabel}>Номер вашего заказа</p>
					<p className={styles.badgeValue}>#{orderNumber}</p>
				</div>

				<div className={styles.actions}>
					<Link
						href={`https://t.me/${botName}`}
						target="_blank"
						className={`${styles.btn} ${styles.btnPrimary}`}
						onClick={() => {
							clearCart();
						}}
					>
						Открыть чат с ботом
					</Link>
				</div>

				<div className={styles.actions}>
					<Link
						href={`${redirectTo}`}
						className={`${styles.btn} ${styles.btnSecondary}`}
						onClick={(e) => {
							clearCart();
						}}
					>
						Перейти в каталог ({closeTimer})
					</Link>
				</div>
			</div>
		</div>
	);
};



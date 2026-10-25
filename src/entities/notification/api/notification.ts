import { EmailSenderParams, TelegramSenderParams } from "../types/notification";

export const sendEmail = ({to, subject, message}: EmailSenderParams) => {
	return fetch("/api/send-email", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			to,
			subject,
			message,
		}),
	});
}

export const sendTelegramBot = async ({message}: TelegramSenderParams) => {
	const response = await fetch("/api/send-telegram-bot", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.error ?? "Не удалось оформить заказ");
	}
};

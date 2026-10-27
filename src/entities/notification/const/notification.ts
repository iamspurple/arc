import { CreateTelegramTemplateForAdmin, EmailTemplateParam } from "../types/notification";
import { formattedDate } from "@/lib/formattedDate";
import { getDirectLinkForCommunication } from "@/lib/telegram";
import { StatusType } from "@/entities/order";
import { keepOnlyDigits } from "@/entities/notification/lib/keepOnlyDigits";

export const createdOrderTemplateForAdmin = ({
	phone,
	email,
	contactWay,
	number,
	customer,
	createdAt,
}: CreateTelegramTemplateForAdmin): string => {
	const contactWayPath = {
		TELEGRAM: phone,
		EMAIL: email,
		WHATSAPP: phone,
	}[contactWay];

	return [
		"🛒 НОВЫЙ ЗАКАЗ",
		"",
		`📦 Номер: #${number}`,
		`👤 Клиент: ${customer}`,
		`📞 Телефон: ${phone}`,
		`📧 Эл-почта: ${email}`,
		`🤙 Предпочитаемый способ связи ${contactWay}: ${contactWay === "EMAIL" ? email : `<a href="${getDirectLinkForCommunication(contactWay, keepOnlyDigits(contactWayPath))}">ОТВЕТИТЬ</a>`}`,
		`🕒 Дата: ${formattedDate(createdAt)}`,
	].join("\n");
};

export const orderChangeStatusTemplateForTelegramBot = (number: string, status: StatusType) => {
	const statusMessages: Record<StatusType, string> = {
		NEW: `📦 Статус заказа #${number} изменен. Новый статус заказа: новый 🆕`,
		PROCESSING: `📦 Статус заказа #${number} изменен. Новый статус заказа: в обработке ⏰`,
		COMPLETE: `📦 Статус заказа #${number} изменен. Новый статус заказа: завершен ✅`,
		CANCELLED: ` 📦Статус заказа #${number} изменен. Новый статус заказа: отменен 🙅`,
	};

	return statusMessages[status];
};

export const orderEmailTemplate = ({contactWay, status, email, customer, phone, number}: EmailTemplateParam) => {
	const statusMessages: Record<StatusType, string> = {
		NEW: `Здравствуйте! Номер Вашего заказа: #${number}`,
		PROCESSING: `Статус вашего заказа #${number} изменен. Новый статус заказа: в обработке`,
		COMPLETE: `Статус вашего заказа #${number} изменен. Новый статус заказа: завершен`,
		CANCELLED: `Статус вашего заказа #${number} изменен. Новый статус заказа: отменен `,
	};

	return statusMessages[status];
};

export const adminTelegramBotName = "dgbfwegbrfgdgferg_bot";

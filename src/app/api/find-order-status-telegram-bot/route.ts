import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram"
import { getOrderStatusByOrderId } from "@/entities/order";

export async function POST(request: Request) {
	try {
		const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

		if (!secret || request.headers.get("x-telegram-bot-api-secret-token") !== secret) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const update = await request.json();
		const message = update.message;

		if (!message?.text || !message?.chat?.id) {
			return NextResponse.json({ ok: true });
		}

		const text: string = message.text;
		const chatId = message.chat.id;

		const matches = [...text.matchAll(/#(\d+)\b/g)];

		if (matches.length === 0) {
			return NextResponse.json({ ok: true });
		}

		if (matches.length > 1) {
			await sendTelegramMessage(chatId, "Укажи только один номер заказа, например #123456.");

			return NextResponse.json({ ok: true });
		}

		const orderNumber = matches[0][1];

		const status = await getOrderStatusByOrderId(orderNumber);

		await sendTelegramMessage(
			chatId,
			status ? `Заказ #${orderNumber}: ${status}` : `Заказ #${orderNumber} не найден.`,
		);

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("Telegram webhook error:", error);

		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

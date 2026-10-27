import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
	try {
		const message: string = await request.json();

		try {
			await sendTelegramMessage(
				process.env.TELEGRAM_CHAT_ID as string,
				message
			);
		} catch (error) {
			console.error("Не удалось отправить уведомление в Telegram:", error);
		}

		return NextResponse.json(
			{
				success: true,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Ошибка создания заказа:", error);

		return NextResponse.json({ error: "Не удалось создать заказ" }, { status: 500 });
	}
}

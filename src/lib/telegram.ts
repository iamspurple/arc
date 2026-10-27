type TelegramResponse = {
	ok: boolean;
	description?: string;
};

export const getDirectLinkForCommunication = (contactWay: string, path: string) => {
	return {
		TELEGRAM: `https://t.me/${path}`,
		WHATSAPP: `https://wa.me/${path}`,
	}[`${contactWay}`];
};

export async function sendTelegramMessage(chatId: string, text: string): Promise<void> {
	const token = process.env.TELEGRAM_BOT_TOKEN;

	if (!token || !chatId) {
		throw new Error("TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID отсутствует");
	}

	const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chat_id: chatId,
			parse_mode: "HTML",
			text,
		}),
		cache: "no-store",
		signal: AbortSignal.timeout(5000),
	});

	const result = (await response.json()) as TelegramResponse;

	if (!response.ok || !result.ok) {
		throw new Error(result.description ?? "Telegram API request failed");
	}
}

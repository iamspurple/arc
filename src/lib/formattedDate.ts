export const formattedDate = (date: string) => {
	return new Date(date).toLocaleString("ru-RU", {
		timeZone: "Europe/Moscow",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
};


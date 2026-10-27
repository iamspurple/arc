export const parseOrderNumber = (text: string) => {
	const match = text.match(/#(\d+)\b/);

	if (match) {
		return match[1];
	}
}

export const keepOnlyDigits = (phone: string) => {
	return phone.replace(/\D/g, "");
}

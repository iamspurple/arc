export const formatPrice = (price: number) => {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const createOrder = (size: string): number => {
	const str = size.toLowerCase();

	switch (str) {
		case "xs":
			return 0;
			break;
		case "s":
			return 1;
			break;
		case "m":
			return 2;
			break;
		case "l":
			return 3;
			break;
		default:
			return 1;
			break;
	}
};

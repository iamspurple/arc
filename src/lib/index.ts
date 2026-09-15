export const formatPrice = (price: number) => {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const createSizeOrder = (size: string): number => {
	const str = size.toLowerCase();

	switch (str) {
		case "xs":
			return 0;
		case "s":
			return 1;
		case "m":
			return 2;
		case "l":
			return 3;
		default:
			return 1;
	}
};

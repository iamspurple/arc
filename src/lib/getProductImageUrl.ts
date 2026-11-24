import { PRODUCT_IMAGE_FULL_PATH, PRODUCT_PLACEHOLDER_IMAGE_NAME } from "@/types/const";

export const getProductImageUrl= (id: string) => {
	if (id) {
		return `${PRODUCT_IMAGE_FULL_PATH}/${id}`;
	}

	return `/images/${PRODUCT_PLACEHOLDER_IMAGE_NAME}`
}

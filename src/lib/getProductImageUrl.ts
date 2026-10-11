import { PRODUCT_IMAGE_FULL_PATH, PRODUCT_PLACEHOLDER_IMAGE_NAME } from "@/types/const";

export const getProductImageUrl= (id: string) => {
	return {
		placeholder: `/images/${PRODUCT_PLACEHOLDER_IMAGE_NAME}`,
		imageProduct: `${PRODUCT_IMAGE_FULL_PATH}/${id}`,
	}[!id ? "placeholder" : "imageProduct"];
}

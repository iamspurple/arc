import type { CatalogItemType } from "@/entities/catalog";
import { PRODUCT_IMAGE_FULL_PATH, PRODUCT_PLACEHOLDER_IMAGE_NAME } from "@/types/const";

export const getPreviewForTheCard = (images: CatalogItemType["images"]): string => {
	return {
		placeholder: `/images/${PRODUCT_PLACEHOLDER_IMAGE_NAME}`,
		imageProduct: `${PRODUCT_IMAGE_FULL_PATH}/${images[0].id}`,
	}[images.length === 0 ? "placeholder" : "imageProduct"];
};

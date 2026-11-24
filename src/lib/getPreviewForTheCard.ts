import type { CatalogItemType } from "@/entities/catalog";
import { PRODUCT_IMAGE_FULL_PATH, PRODUCT_PLACEHOLDER_IMAGE_NAME } from "@/types/const";

export const getPreviewForTheCard = (images: CatalogItemType["images"]): string => {
	if (Array.isArray(images) && images.length > 0) {
		return `${PRODUCT_IMAGE_FULL_PATH}/${images[0].id}`
	}

	return `/images/${PRODUCT_PLACEHOLDER_IMAGE_NAME}`
};

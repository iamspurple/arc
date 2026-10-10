import "server-only";
import { cacheTag } from "next/cache";
import { catalogRepository } from "../repositories/catalog";

export async function getCatalogs() {
	"use cache";
	cacheTag("products");
	return catalogRepository.catalogList();
}

export async function getCatalogItemByProductOptionSlug(slug: string) {
	"use cache";
	cacheTag("products");
	return catalogRepository.catalogItemByProductOptionSlug(slug);
}

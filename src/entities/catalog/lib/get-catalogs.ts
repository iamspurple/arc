import "server-only";
import { cacheTag } from "next/cache";
import { catalogRepository } from "../repositories/catalog";
import { productsCacheTagName } from "@/types/const";

export async function getCatalogs() {
	"use cache";
	cacheTag(productsCacheTagName);
	return catalogRepository.catalogList();
}

export async function getCatalogItemByProductOptionSlug(slug: string) {
	"use cache";
	cacheTag(productsCacheTagName);
	return catalogRepository.catalogItemByProductOptionSlug(slug);
}

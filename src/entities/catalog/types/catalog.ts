import { ProductImage, ProductOption, Product, ProductSize } from "@/generated/prisma/client";

export type CatalogItemType = Pick<ProductOption, "id" | "slug" | "title" | "price"> & {
	images: ProductImage[];
};

export type CatalogItem = ProductOption & {
	products: Product;
	sizes: ProductSize[];
	images: ProductImage[];
};


import "server-only";
import { prisma } from "@/lib/prisma";
import { CatalogItemType, CatalogItem } from "../types/catalog";

export const catalogRepository = {
	catalogList: async (): Promise<CatalogItemType[]> => {
		return prisma.productOption.findMany({
			orderBy: {
				createdAt: "asc",
			},
			select: {
				id: true,
				slug: true,
				title: true,
				images: true,
				price: true,
			},
		});
	},
	catalogItemByProductOptionSlug: async (slug: string): Promise<CatalogItem | null> => {
		return prisma.productOption.findUnique({
			where: { slug },
			include: {
				products: true,
				sizes: true,
				images: true,
			},
		});
	},
};

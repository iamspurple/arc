import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const products = await prisma.productOption.findMany({
		orderBy: {
			createdAt: "asc",
		},
		select: {
			slug: true,
			updatedAt: true,
		},
	});

	const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
		url: `${BASE_URL}/catalog/${product.slug}`,
		lastModified: product.updatedAt ?? new Date(),
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	const staticUrls: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${BASE_URL}/catalog`,
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/about`,
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: `${BASE_URL}/contacts`,
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: `${BASE_URL}/delivery`,
			changeFrequency: "monthly",
			priority: 0.5,
		},
	];

	return [...staticUrls, ...productUrls];
}

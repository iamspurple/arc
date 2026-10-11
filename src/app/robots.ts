import type { MetadataRoute } from "next";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/dashboard/", "/login/", "/checkout/"],
		},
		sitemap: `${BASE_URL}/sitemap.xml`,
	};
}

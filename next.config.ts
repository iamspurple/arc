import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "50mb",
		},
	},
	cacheComponents: true,
};

export default nextConfig;

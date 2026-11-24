import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		proxyClientMaxBodySize: "50mb",
		serverActions: {
			bodySizeLimit: "50mb",
		},
	},
	cacheComponents: true,
};

export default nextConfig;

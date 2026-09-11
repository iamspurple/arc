"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

export function TanStackProvider({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	useEffect(() => {
		window.__TANSTACK_QUERY_CLIENT__ = queryClient;
	}, []);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

// TypeScript only:
declare global {
	interface Window {
		__TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
	}
}

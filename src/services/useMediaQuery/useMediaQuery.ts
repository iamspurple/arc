"use client";

import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(() => {
		if (typeof window !== "undefined") {
			return window.matchMedia(query).matches;
		}
		return false;
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		const mediaQueryList = window.matchMedia(query);

		const listener = (e: MediaQueryListEvent) => {
			setMatches(e.matches);
		};

		mediaQueryList.addEventListener("change", listener);

		return () => mediaQueryList.removeEventListener("change", listener);
	}, [query]);

	return matches;
};

export default useMediaQuery;

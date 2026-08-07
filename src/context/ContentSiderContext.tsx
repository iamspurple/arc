"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ContentSiderContextType = {
	optionId: string;
	isSiderOpen: boolean;
	handleOpenSider: (id: string) => void;
	handleCloseSider: () => void;
};

const ContentSiderContext = createContext<ContentSiderContextType | undefined>(undefined);

export function ContentSiderProvider({ children }: { children: ReactNode }) {
	const [optionId, setOptionId] = useState("");
	const [isSiderOpen, setIsSiderOpen] = useState(false);

	const handleOpenSider = (id: string) => {
		setOptionId(id);
		setIsSiderOpen(true);
	};

	const handleCloseSider = () => {
		setOptionId("");
		setIsSiderOpen(false);
	};

	return (
		<ContentSiderContext.Provider
			value={{
				optionId,
				isSiderOpen,
				handleOpenSider,
				handleCloseSider,
			}}
		>
			{children}
		</ContentSiderContext.Provider>
	);
}

export function useContentSider() {
	const context = useContext(ContentSiderContext);
	if (context === undefined) {
		throw new Error("useContentSider must be used within a ContentSiderProvider");
	}
	return context;
}

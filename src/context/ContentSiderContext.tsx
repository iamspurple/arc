"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ContentSiderContextType = {
	optionId: string;
	isSiderOpen: boolean;
	handleOpenSider: (id: string) => void;
	handleCloseSider: () => void;
	orderId: string;
	isOrderSiderOpen: boolean;
	handleOpenOrderSider: (id: string) => void;
	handleCloseOrderSider: () => void;
};

const ContentSiderContext = createContext<ContentSiderContextType | undefined>(undefined);

export function ContentSiderProvider({ children }: { children: ReactNode }) {
	const [optionId, setOptionId] = useState("");
	const [orderId, setOrderId] = useState("");
	const [isSiderOpen, setIsSiderOpen] = useState(false);
	const [isOrderSiderOpen, setIsOrderSiderOpen] = useState(false);

	const handleOpenSider = (id: string) => {
		setOptionId(id);
		setIsSiderOpen(true);
	};

	const handleCloseSider = () => {
		setOptionId("");
		setIsSiderOpen(false);
	};

	const handleOpenOrderSider = (id: string) => {
		setOrderId(id);
		setIsOrderSiderOpen(true);
	};

	const handleCloseOrderSider = () => {
		setOrderId("");
		setIsOrderSiderOpen(false);
	};

	return (
		<ContentSiderContext.Provider
			value={{
				optionId,
				isSiderOpen,
				handleOpenSider,
				handleCloseSider,
				orderId,
				isOrderSiderOpen,
				handleOpenOrderSider,
				handleCloseOrderSider,
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

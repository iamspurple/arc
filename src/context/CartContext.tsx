"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type CartItem = {
	id: string;
	slug: string;
	title: string;
	price: number;
	size: string;
	quantity: number;
	image?: string;
};

type CartContextType = {
	items: CartItem[];
	isOpen: boolean;
	openCart: () => void;
	closeCart: () => void;
	addItem: (item: Omit<CartItem, "quantity">) => void;
	removeItem: (id: string, size: string) => void;
	updateQuantity: (id: string, size: string, quantity: number) => void;
	clearCart: () => void;
	totalItems: number;
	totalPrice: number;
	isMenuOpen: boolean;
	openMenu: () => void;
	closeMenu: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "arc-cart";

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isHydrated, setIsHydrated] = useState(false);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(CART_STORAGE_KEY);
		if (stored) {
			try {
				setItems(JSON.parse(stored));
			} catch (e) {
				console.error("Failed to parse cart from localStorage", e);
			}
		}
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (isHydrated) {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
		}
	}, [items, isHydrated]);

	useEffect(() => {
		if (isOpen || isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen, isMenuOpen]);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	const openMenu = () => setIsMenuOpen(true);
	const closeMenu = () => setIsMenuOpen(false);

	const addItem = (newItem: Omit<CartItem, "quantity">) => {
		setItems((prev) => {
			const existingIndex = prev.findIndex(
				(item) => item.id === newItem.id && item.size === newItem.size
			);

			if (existingIndex > -1) {
				return prev.map((item, index) =>
					index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
				);
			}

			return [...prev, { ...newItem, quantity: 1 }];
		});
	};

	const removeItem = (id: string, size: string) => {
		setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
	};

	const updateQuantity = (id: string, size: string, quantity: number) => {
		if (quantity <= 0) {
			removeItem(id, size);
			return;
		}

		setItems((prev) =>
			prev.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item))
		);
	};

	const clearCart = () => {
		setItems([]);
	};

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				items,
				isOpen,
				openCart,
				closeCart,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
				totalItems,
				totalPrice,
				isMenuOpen,
				openMenu,
				closeMenu,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}

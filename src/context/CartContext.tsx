"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

export type CartItem = {
	id: string;
	slug: string;
	title: string;
	price: number;
	size: string;
	quantity: number;
	image?: string;
};

type CartDataContextType = {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
};

type CartUIContextType = {
	isOpen: boolean;
	isMenuOpen: boolean;
};

type CartActionsContextType = {
	openCart: () => void;
	closeCart: () => void;
	addItem: (item: Omit<CartItem, "quantity">) => void;
	removeItem: (id: string, size: string) => void;
	updateQuantity: (id: string, size: string, quantity: number) => void;
	clearCart: () => void;
	openMenu: () => void;
	closeMenu: () => void;
};

const CartDataContext = createContext<CartDataContextType | undefined>(undefined);
const CartUIContext = createContext<CartUIContextType | undefined>(undefined);
const CartActionsContext = createContext<CartActionsContextType | undefined>(undefined);

const CART_STORAGE_KEY = "arc-cart";

function loadCartFromStorage(): CartItem[] {
	if (typeof window === "undefined") return [];
	const stored = localStorage.getItem(CART_STORAGE_KEY);
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch (e) {
			console.error("Failed to parse cart from localStorage", e);
		}
	}
	return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);
	const [isOpen, setIsOpen] = useState(false);
	const isHydratedRef = useRef(false);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		isHydratedRef.current = true;
	}, []);

	useEffect(() => {
		if (isHydratedRef.current) {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
		}
	}, [items]);

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

	const openCart = useCallback(() => setIsOpen(true), []);
	const closeCart = useCallback(() => setIsOpen(false), []);

	const openMenu = useCallback(() => setIsMenuOpen(true), []);
	const closeMenu = useCallback(() => setIsMenuOpen(false), []);

	const addItem = useCallback((newItem: Omit<CartItem, "quantity">) => {
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
	}, []);

	const removeItem = useCallback((id: string, size: string) => {
		setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
	}, []);

	const updateQuantity = useCallback(
		(id: string, size: string, quantity: number) => {
			if (quantity <= 0) {
				removeItem(id, size);
				return;
			}

			setItems((prev) =>
				prev.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item))
			);
		},
		[removeItem]
	);

	const clearCart = useCallback(() => {
		setItems([]);
	}, []);

	const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
	const totalPrice = useMemo(
		() => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
		[items]
	);

	const cartDataContextValue = useMemo(
		() => ({
			items,
			totalItems,
			totalPrice,
		}),
		[items, totalItems, totalPrice]
	);

	const cartUIContextValue = useMemo(
		() => ({
			isOpen,
			isMenuOpen,
		}),
		[isOpen, isMenuOpen]
	);

	const cartActionsContextValue = useMemo(
		() => ({
			openCart,
			closeCart,
			addItem,
			removeItem,
			updateQuantity,
			clearCart,
			openMenu,
			closeMenu,
		}),
		[openCart, closeCart, addItem, removeItem, updateQuantity, clearCart, openMenu, closeMenu]
	);

	return (
		<CartDataContext.Provider value={cartDataContextValue}>
			<CartUIContext.Provider value={cartUIContextValue}>
				<CartActionsContext.Provider value={cartActionsContextValue}>
					{children}
				</CartActionsContext.Provider>
			</CartUIContext.Provider>
		</CartDataContext.Provider>
	);
}

export function useCart() {
	const dataContext = useContext(CartDataContext);
	const uiContext = useContext(CartUIContext);
	if (dataContext === undefined || uiContext === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return { ...dataContext, ...uiContext };
}

export function useCartData() {
	const context = useContext(CartDataContext);
	if (context === undefined) {
		throw new Error("useCartData must be used within a CartProvider");
	}
	return context;
}

export function useCartUI() {
	const context = useContext(CartUIContext);
	if (context === undefined) {
		throw new Error("useCartUI must be used within a CartProvider");
	}
	return context;
}

export function useCartActions() {
	const context = useContext(CartActionsContext);
	if (context === undefined) {
		throw new Error("useCartActions must be used within a CartProvider");
	}
	return context;
}

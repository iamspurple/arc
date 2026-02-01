import {
	useState,
	createContext,
	ReactNode,
	useContext,
	useCallback,
	useMemo,
} from "react";

type DashboardDataContextType = {
	optionId: string;
	productId: string;
};

type DashboardUIContextType = {
	isModalOpen: boolean;
	isSiderOpen: boolean;
};

type DashboardActionsContextType = {
	setProductId: (id: string) => void;
	handleOpenSider: (id: string) => void;
	handleCloseSider: () => void;
	showModal: () => void;
	handleCancel: () => void;
	handleClose: () => void;
};

const DashboardDataContext = createContext<DashboardDataContextType | undefined>(undefined);
const DashboardUIContext = createContext<DashboardUIContextType | undefined>(undefined);
const DashboardActionsContext = createContext<DashboardActionsContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
	const [optionId, setOptionId] = useState("");
	const [productId, setProductId] = useState<string>("");

	const [isSiderOpen, setIsSiderOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const handleCancel = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const handleClose = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const handleOpenSider = useCallback((id: string) => {
		setOptionId(id);
		setIsSiderOpen(true);
	}, []);

	const handleCloseSider = useCallback(() => {
		setOptionId("");
		setIsSiderOpen(false);
	}, []);

	const setProductIdCallback = useCallback((id: string) => {
		setProductId(id);
	}, []);

	const dashboardDataContextValue = useMemo(
		() => ({
			optionId,
			productId,
		}),
		[optionId, productId]
	);

	const dashboardUIContextValue = useMemo(
		() => ({
			isModalOpen,
			isSiderOpen,
		}),
		[isModalOpen, isSiderOpen]
	);

	const dashboardActionsContextValue = useMemo(
		() => ({
			handleCloseSider,
			handleOpenSider,
			showModal,
			handleCancel,
			handleClose,
			setProductId: setProductIdCallback,
		}),
		[handleCloseSider, handleOpenSider, showModal, handleCancel, handleClose, setProductIdCallback]
	);

	return (
		<DashboardDataContext.Provider value={dashboardDataContextValue}>
			<DashboardUIContext.Provider value={dashboardUIContextValue}>
				<DashboardActionsContext.Provider value={dashboardActionsContextValue}>
					{children}
				</DashboardActionsContext.Provider>
			</DashboardUIContext.Provider>
		</DashboardDataContext.Provider>
	);
}

export function useDashboard() {
	const dataContext = useContext(DashboardDataContext);
	const uiContext = useContext(DashboardUIContext);
	if (dataContext === undefined || uiContext === undefined) {
		throw new Error("useDashboard must be used within a DashboardProvider");
	}
	return { ...dataContext, ...uiContext };
}

export function useDashboardData() {
	const context = useContext(DashboardDataContext);
	if (context === undefined) {
		throw new Error("useDashboardData must be used within a DashboardProvider");
	}
	return context;
}

export function useDashboardUI() {
	const context = useContext(DashboardUIContext);
	if (context === undefined) {
		throw new Error("useDashboardUI must be used within a DashboardProvider");
	}
	return context;
}

export function useDashboardActions() {
	const context = useContext(DashboardActionsContext);
	if (context === undefined) {
		throw new Error("useDashboardActions must be used within a DashboardProvider");
	}
	return context;
}

import { HomeOutlined, OrderedListOutlined, ProductOutlined } from "@ant-design/icons";

const DASHBOARD_PREFIX = "/dashboard" as const;

export const DASHBOARD_ROUTES = {
	main: `${DASHBOARD_PREFIX}`,
	product: `${DASHBOARD_PREFIX}/product`,
	order: `${DASHBOARD_PREFIX}/order`,
} as const;

export const DASHBOARD_ROUTES_MENU_CONFIG = [
	{
		label: "Главная",
		icon: HomeOutlined,
		href: `${DASHBOARD_PREFIX}`,
	},
	{
		label: "Продукты",
		icon: ProductOutlined,
		href: `${DASHBOARD_PREFIX}/product`,
	},
	{
		label: "Заказы",
		icon: OrderedListOutlined,
		href: `${DASHBOARD_PREFIX}/order`,
	},
] as const;
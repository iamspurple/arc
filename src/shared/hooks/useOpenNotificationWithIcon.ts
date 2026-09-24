import { notification, NotificationArgsProps } from "antd";
import { useCallback } from "react";

type NotificationType = "success" | "info" | "warning" | "error";
type NotificationPlacement = NotificationArgsProps["placement"];

type onShowNotificationType = {
	type: NotificationType;
	title?: string;
	description?: string;
	placement?: NotificationPlacement;
};

export const useOpenNotificationWithIcon = () => {
	const [api, contextHolder] = notification.useNotification();

	const onShowNotification = useCallback(({type, title, description, placement = 'top'}: onShowNotificationType) => {
		api[type]({
			title,
			description,
			placement
		});
	}, []);

	return {
		onShowNotification,
		contextHolder,
	};
};

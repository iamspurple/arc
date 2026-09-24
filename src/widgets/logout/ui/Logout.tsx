import { Button, Tooltip } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { useCallback } from "react";

export const Logout = () => {
	const onLogout = useCallback(async () => {
		await signOut({ callbackUrl: "/login" });
	}, []);

	return (
		<Tooltip placement="right" title="Выйти">
			<Button onClick={onLogout} type="link" icon={<LogoutOutlined />} />
		</Tooltip>
	);
};
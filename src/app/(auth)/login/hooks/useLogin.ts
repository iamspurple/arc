import { FormProps } from "antd";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useOpenNotificationWithIcon } from "@/shared/hooks/useOpenNotificationWithIcon";

type FieldType = {
	email?: string;
	password?: string;
};

export const useLogin = () => {
	const router = useRouter();

	const { onShowNotification, contextHolder } = useOpenNotificationWithIcon();

	const handleSubmit: FormProps<FieldType>["onFinish"] = async ({ email, password }) => {
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (result?.error) {
			onShowNotification({
				type: "error",
				title: "Произошла ошибка при входе",
			});
		} else {
			router.push("/dashboard");
			router.refresh();
		}
	};

	const handleError = () => {};
	
	return {
		handleSubmit,
		handleError,
		contextHolder,
	};
}
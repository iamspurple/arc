"use client";
import { Form, Input, Button } from "antd";
import { useLogin } from './hooks/useLogin'
import style from "./login.module.scss";


export default function Login() {
	const {handleSubmit, handleError, contextHolder} = useLogin();

	return (
		<>
			{contextHolder}
			<div className={style.Login}>
				<Form
					name="login"
					className={style.Form}
					layout="vertical"
					autoComplete="off"
					onFinish={handleSubmit}
					onFinishFailed={handleError}
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[{ required: true, message: "Поле обязателен к заполнению!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: "Поле обязателен к заполнению!" }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item label={null}>
						<Button type="primary" htmlType="submit">
							Войти
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}

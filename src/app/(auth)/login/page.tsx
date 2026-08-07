"use client";
import Link from "next/link";

import { DASHBOARD_ROUTES } from "@/shared/config/routes";

import { Form, Input, Button } from "antd";

export default function Login() {
	return (
		<>
			<div
				style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
			>
				<Form
					name="loginForm"
					style={{ maxWidth: 400, width: "55%" }}
					layout="vertical"
					autoComplete="off"
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item label={null}>
						<Link href={DASHBOARD_ROUTES.main}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Link>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}

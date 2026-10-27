import { createTransport } from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { to, subject, message } = await request.json();

		if (!to || !subject || !message) {
			return NextResponse.json({ error: "Заполни все поля" }, { status: 400 });
		}

		const formattedBody = `
			<html>
				<body>
					${message}
				</body>
			</html>
		`;

		const transport = createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_HOST_PORT),
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		const sendMailParams = {
			to: to,
			from: process.env.EMAIL_USER,
			subject: subject,
			html: formattedBody,
		};

		await transport.sendMail(sendMailParams);
		return NextResponse.json(
			{ success: true, message: "Письмо успешно отправлено!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Email error:", error);

		return NextResponse.json({ error: "Не удалось отправить письмо" }, { status: 500 });
	}
}

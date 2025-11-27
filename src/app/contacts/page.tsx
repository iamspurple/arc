import './contacts.scss'
import Link from 'next/link'

const Page = () => {
	return (
		<div className="contacts-page">
			<h1 className="contacts-page__title">Контакты</h1>

			<div className="contacts-page__content">
				<p className="contacts-page__content-subtitle">
					Если у вас возникнут вопросы или сложности с заказом, пожалуйста,
					свяжитесь с нами.
				</p>

				<p>
					E-mail: <Link href="mailto:arc@gmail.com">arc@gmail.com</Link>
				</p>

				<p>Telegram:</p>

				<p>
					Также вы можете связаться с нами в{' '}
					<Link href="https://t.me/xxx">direct message</Link>
				</p>
			</div>
		</div>
	)
}

export default Page

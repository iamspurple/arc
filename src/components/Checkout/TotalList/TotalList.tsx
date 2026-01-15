import type { CartItem } from "@/context/CartContext";
import { formatPrice } from "@/services";
import style from "./TotalList.module.scss";
import Image from "next/image";

const TotalList = ({ items }: { items: CartItem[] }) => {
	return (
		<ul className={style.list}>
			{items.map((item) => (
				<li key={`${item.id}-${item.size}`}>
					<div className={style.item}>
						{item.image && (
							<div className={style.item_image}>
								<Image
									src={item.image}
									alt={item.title}
									fill
									sizes="80px"
									style={{ objectFit: "cover" }}
								/>
							</div>
						)}

						<span>
							{item.title}, {item.size} <br />
							{item.quantity}шт.
						</span>
					</div>
					<span>{formatPrice(item.price * item.quantity)}</span>
				</li>
			))}
		</ul>
	);
};

export default TotalList;

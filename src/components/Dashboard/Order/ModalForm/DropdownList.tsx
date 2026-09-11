import { Image, Typography } from "antd";

import type { Option } from "./Step2";
import styles from "./Step2.module.scss";

import { getProductImagePublicUrl } from "@/lib/productImageUpload";

type DropdownListProps = {
	item: Option;
	add: (obj: {
		optionId: string;
		sizeId: "";
		quantity: null;
		productName: string;
		optionName: string;
		image: string;
		article: string;
	}) => void;
};

export const DropdownList = (props: DropdownListProps) => {
	const { item, add } = props;
	return (
		<div
			className={styles.dropdownItem}
			onClick={() => {
				add({
					optionId: item.id,
					sizeId: "",
					quantity: null,
					productName: item.productName,
					optionName: item.optionName,
					image: item.image,
					article: item.article,
				});
			}}
		>
			<Image
				width={50}
				height={50}
				src={getProductImagePublicUrl(item?.image)}
				alt={`${item?.productName} ${item?.optionName}`}
				preview={false}
			/>

			<div className={styles.dropdownInfo}>
				<div className={styles.dropdownRow}>
					<Typography.Text strong>{item?.productName}</Typography.Text>
					<Typography.Text type="secondary">{item?.article}</Typography.Text>
				</div>
				<Typography.Text type="secondary">{item?.optionName}</Typography.Text>
			</div>
		</div>
	);
};

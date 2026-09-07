import { Flex, Image, Typography } from "antd";

import type { Option } from "./Step2";

type DropdownListProps = {
	item: Option;
	add: (obj: {
		optionId: string;
		sizeId: "";
		quantity: 0;
		productName: string;
		optionName: string;
		image: string;
		article: string;
	}) => void;
};

export const DropdownList = (props: DropdownListProps) => {
	const { item, add } = props;
	return (
		<Flex
			gap="middle"
			align="flex-start"
			onClick={() => {
				add({
					optionId: item.id,
					sizeId: "",
					quantity: 0,
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
				src={`/static/products/${item?.image}`}
				alt={`${item?.productName} ${item?.optionName}`}
			/>

			<Flex vertical flex="auto" style={{ minWidth: 0 }}>
				<Flex justify="space-between" gap="small">
					<Typography.Text strong>{item?.productName}</Typography.Text>
					<Typography.Text type="secondary">{item?.article}</Typography.Text>
				</Flex>
				<Typography.Text type="secondary">{item?.optionName}</Typography.Text>
			</Flex>
		</Flex>
	);
};

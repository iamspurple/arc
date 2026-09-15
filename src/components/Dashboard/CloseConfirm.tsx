import { Modal, Button, Flex, Typography } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

type CloseConfirmProps = {
	isConfirmOpen: boolean;
	handleCloseConfirm: () => void;
	handleCloseAll: () => void;
};

export const CloseConfirm = (props: CloseConfirmProps) => {
	const { isConfirmOpen, handleCloseAll, handleCloseConfirm } = props;
	return (
		<Modal
			open={isConfirmOpen}
			onCancel={handleCloseConfirm}
			footer={null}
			mask={{ blur: true }}
			centered
			width={420}
			closable={false}
		>
			<Flex vertical gap={20}>
				<Flex gap={14} align="flex-start">
					<Flex vertical gap={4}>
						<Flex>
							<ExclamationCircleFilled style={{ color: "#ff3030", fontSize: 18 }} />
							<Typography.Title level={5} style={{ margin: 5 }}>
								Закрыть форму?
							</Typography.Title>
						</Flex>
						<Typography.Text type="secondary">
							Все несохранённые изменения
							<br />
							будут потеряны.
						</Typography.Text>
					</Flex>
				</Flex>
				<Flex gap={8} justify="flex-end">
					<Button onClick={handleCloseConfirm}>Отмена</Button>
					<Button type="primary" danger onClick={handleCloseAll}>
						Закрыть
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

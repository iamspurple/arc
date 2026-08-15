import { Image, Button } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { ChangeEvent, useRef, Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./UIImageUpload.module.scss";

type ImgInitialType = {
	id: string;
	trigger: "new" | "old";
	src: string;
	file?: File;
};

type UIImageUploadProps = {
	initialData: ImgInitialType[];
	setFiles: Dispatch<SetStateAction<Record<string, ImgInitialType[]>>>;
	optionKey: string;
};

export const UIImageUpload = (props: UIImageUploadProps) => {
	const { initialData: files, setFiles, optionKey } = props;

	const inputFileRef = useRef<HTMLInputElement | null>(null);

	const onChangeFile = () => {
		if (inputFileRef.current) {
			inputFileRef.current.click();
		}
	};

	const loadFile = (e: ChangeEvent<HTMLInputElement>) => {
		const rawFiles = Array.from(e.target.files?.length ? e.target.files : []);

		rawFiles.forEach((f) => {
			const fileReader = new FileReader();
			fileReader.onload = (e) => {
				setFiles((prev) => {
					if (typeof e.target?.result == "string") {
						return {
							...prev,
							[optionKey]: [
								...(prev[optionKey] ?? []),
								{ id: uuidv4(), trigger: "new", src: e.target.result, file: f },
							],
						};
					}

					return prev;
				});
			};
			fileReader.readAsDataURL(f);
		});
	};

	const removeImg = (obj: ImgInitialType) => {
		setFiles((prev) => ({
			...prev,
			[optionKey]: prev[optionKey].filter((f) => f.id !== obj.id),
		}));
	};

	return (
		<div>
			<Button type="primary" onClick={onChangeFile}>
				<UploadOutlined /> Загрузить
			</Button>

			<input
				onChange={loadFile}
				ref={inputFileRef}
				type="file"
				multiple
				style={{ visibility: "hidden" }}
			></input>

			<div className={styles.imageList}>
				<Image.PreviewGroup>
					{files.map((f) => (
						<div className={styles.imageWrapper} key={f.id}>
							<Image src={f.src} width={"100%"} height={"100%"} alt={f.id} />
							<button title="Удалить" className={styles.delete} onClick={removeImg.bind(null, f)}>
								<DeleteOutlined style={{ color: "black" }} />
							</button>
						</div>
					))}
				</Image.PreviewGroup>
			</div>
		</div>
	);
};

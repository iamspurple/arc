import { useState } from "react";

import { GetProp, Image, Upload, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type ImageUploadProps = {
	disabled?: boolean;
	onChangeFileList: (fileList: UploadFile[]) => void;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export const ImageUpload = ({ disabled, onChangeFileList }: ImageUploadProps) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
		onChangeFileList(fileList);
	};

	const uploadButton = (
		<button style={{ border: 0, background: "none" }} type="button">
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);
	return (
		<>
			<Upload
				// action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				beforeUpload={() => {
					return false
				}}
				onChange={(files) => {
					setFileList(files.fileList);
					onChangeFileList(files.fileList);
				}}
				onRemove={(fileRemove) => {
					setFileList((prevState) => prevState.filter((file) => file.uid !== fileRemove?.uid));
					onChangeFileList(fileList)
				}}
				disabled={disabled}
				maxCount={5}
				multiple
			>
				{fileList.length >= 5 ? null : uploadButton}
			</Upload>
			{previewImage && (
				<Image
					alt="изображение товара"
					styles={{ root: { display: "none" } }}
					preview={{
						open: previewOpen,
						onOpenChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) => !visible && setPreviewImage(""),
					}}
					src={previewImage}
				/>
			)}
		</>
	);
};

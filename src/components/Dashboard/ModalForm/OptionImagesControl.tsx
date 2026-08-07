import { useEffect, useRef, useState } from "react";

import type { UploadFile, UploadProps } from "antd";

import { ImageUpload } from "../ImageUpload";
import { mergeProductImageIds, type ProductImageUploadFile } from "@/lib/productImageUpload";

type Props = {
	initialFiles?: UploadFile[];
	/** Вызывается при каждом изменении списка (для ref в родителе при сабмите). */
	onCommit: (files: UploadFile[]) => void;
};

/**
 * Список изображений варианта вне стора Form: rc-field-form портит значения Upload при onFinish.
 */
export const OptionImagesControl = ({ initialFiles, onCommit }: Props) => {
	const onCommitRef = useRef(onCommit);
	onCommitRef.current = onCommit;

	const [fileList, setFileList] = useState<UploadFile[]>(() =>
		(initialFiles ?? []).map((f) => ({ ...f }))
	);

	const initialStamp =
		initialFiles
			?.map((f) => (f as ProductImageUploadFile).productImageId ?? f.uid)
			.join("|") ?? "";

	useEffect(() => {
		const next = (initialFiles ?? []).map((f) => ({ ...f }));
		setFileList(next);
		onCommitRef.current(next);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- сброс только при новых данных с сервера, не при каждом рендере родителя
	}, [initialStamp]);

	const handleChange: UploadProps["onChange"] = (info) => {
		setFileList((prev) => {
			const merged = mergeProductImageIds(prev, info.fileList);
			onCommitRef.current(merged);
			return merged;
		});
	};

	return <ImageUpload fileList={fileList} onChange={handleChange} />;
};

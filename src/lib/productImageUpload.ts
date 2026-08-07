import type { UploadFile } from "antd";

/** Публичный URL файла в `static/products` (id записи = имя файла на диске). */
export function getProductImagePublicUrl(fileName: string): string {
	return `/static/products/${encodeURIComponent(fileName)}`;
}

export function toProductImageUploadFiles(
	images: Array<{ id: string; alt: string; url?: string }>
): UploadFile[] {
	return images.map((img) => ({
		uid: img.id,
		name: img.alt || img.id,
		status: "done",
		url: img.url ?? getProductImagePublicUrl(img.id),
		productImageId: img.id,
	}));
}

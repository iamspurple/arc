import fs from "node:fs";
import path from "node:path";

export const deleteProductImageByFileName = async (fileName: string) => {
	try {
		fs.unlinkSync(path.resolve(process.cwd(), "static", "products", fileName));
		return true;
	} catch {
		throw Error("Ошибка");
	}
};
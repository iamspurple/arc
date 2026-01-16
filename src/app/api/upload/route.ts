import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "Файл не выбран" },
                { status: 400 }
            );
        }

        // Проверяем тип файла
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Разрешены только изображения" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Генерируем уникальное имя файла
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
        const fileName = `${timestamp}-${originalName}`;

        // Путь для сохранения в public/images
        const uploadDir = path.join(process.cwd(), "public", "images");
        const filePath = path.join(uploadDir, fileName);

        // Сохраняем файл
        await writeFile(filePath, buffer);

        // Возвращаем путь для использования в приложении
        const url = `/images/${fileName}`;

        return NextResponse.json({ url, fileName });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Ошибка загрузки файла" },
            { status: 500 }
        );
    }
}

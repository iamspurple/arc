import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type ParamsContext = { params: Promise<{ id: string }> };

async function getSlug(context: ParamsContext) {
	const { id } = await context.params;
	return id;
}

export async function GET(req: Request, context: ParamsContext) {
	try {
		const slug = await getSlug(context);

		const product = await prisma.product.findUnique({
			where: { slug },
			include: { images: true },
		});

		if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

		return NextResponse.json(product);
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function PUT(req: Request, context: ParamsContext) {
	try {
		const data = await req.json();
		const slug = await getSlug(context);

		// Если изменилось название, обновляем slug
		const updateData: {
			title?: string;
			slug?: string;
			description?: string | null;
			composition?: string | null;
			care?: string | null;
			sizes?: string | null;
			price?: number;
			inStock?: boolean;
			images?: {
				deleteMany: {};
				create: Array<{ url: string }>;
			};
		} = {
			description: data.description,
			composition: data.composition,
			care: data.care,
			sizes: data.sizes,
			price: data.price,
			inStock: data.inStock,
			images: {
				deleteMany: {},
				create: (data.images || []).map((img: { url: string }) => ({
					url: img.url,
				})),
			} as {
				deleteMany: Record<string, never>;
				create: Array<{ url: string }>;
			},
		};

		if (data.title) {
			updateData.title = data.title;
			// Генерируем новый slug только если изменилось название
			const currentProduct = await prisma.product.findUnique({
				where: { slug },
			});
			if (currentProduct && currentProduct.title !== data.title) {
				const { createSlug } = await import("@/lib/slug");
				const baseSlug = createSlug(data.title);
				let newSlug = baseSlug;
				let counter = 1;
				while (await prisma.product.findUnique({ where: { slug: newSlug } })) {
					newSlug = `${baseSlug}-${counter}`;
					counter++;
				}
				updateData.slug = newSlug;
			}
		}

		const updated = await prisma.product.update({
			where: { slug },
			data: updateData,
			include: { images: true },
		});

		return NextResponse.json(updated);
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
export async function DELETE(req: Request, context: ParamsContext) {
	try {
		const slug = await getSlug(context);

		const product = await prisma.product.findUnique({
			where: { slug },
		});

		if (!product) {
			return NextResponse.json({ error: "Not found" }, { status: 404 });
		}

		await prisma.productImage.deleteMany({
			where: { productId: product.id },
		});

		await prisma.product.delete({
			where: { slug },
		});

		return NextResponse.json({ success: true });
	} catch (e) {
		console.error("DELETE /products/[id] error:", e);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

import { prisma } from '@/lib/prisma'
import { createSlug } from '@/lib/slug'
import { NextResponse } from 'next/server'

export async function GET() {
	const products = await prisma.product.findMany({
		include: { images: true },
	})

	return NextResponse.json(products)
}

export async function POST(req: Request) {
	try {
		const data = await req.json()

		// Валидация обязательных полей
		if (!data.title || !data.price) {
			return NextResponse.json(
				{ error: 'Title and price are required' },
				{ status: 400 }
			)
		}

		// Генерируем slug из названия
		const baseSlug = createSlug(data.title)
		let slug = baseSlug
		let counter = 1

		// Проверяем уникальность slug
		while (await prisma.product.findUnique({ where: { slug } })) {
			slug = `${baseSlug}-${counter}`
			counter++
		}

		const product = await prisma.product.create({
			data: {
				title: data.title,
				slug,
				description: data.description || null,
				composition: data.composition || null,
				care: data.care || null,
				sizes: data.sizes || null,
				price: parseInt(data.price),
				inStock: data.inStock ?? true,
				images: {
					create: (data.images || []).map((img: { url: string }) => ({
						url: img.url,
					})),
				},
			},
			include: { images: true },
		})

		return NextResponse.json(product, { status: 201 })
	} catch (e) {
		console.error(e)
		return NextResponse.json(
			{
				error: 'Invalid data',
				details: e instanceof Error ? e.message : 'Unknown error',
			},
			{ status: 400 }
		)
	}
}

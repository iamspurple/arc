import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type ParamsContext = { params: Promise<{ id: string }> }

async function getId(context: ParamsContext) {
	const { id } = await context.params
	return id
}

export async function GET(req: Request, context: ParamsContext) {
	try {
		const id = await getId(context)

		const product = await prisma.product.findUnique({
			where: { id },
		})

		if (!product)
			return NextResponse.json({ error: 'Not found' }, { status: 404 })

		return NextResponse.json(product)
	} catch (e) {
		console.error(e)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}

export async function PUT(req: Request, context: ParamsContext) {
	try {
		const data = await req.json()
		const id = await getId(context)

		const updated = await prisma.product.update({
			where: { id },
			data: {
				title: data.title,
				description: data.description,
				composition: data.composition,
				care: data.care,
				price: data.price,
				inStock: data.inStock,
				images: {
					deleteMany: {},
					create: (data.images || []).map((img: { url: string }) => ({
						url: img.url,
					})),
				},
			},
			include: { images: true },
		})

		return NextResponse.json(updated)
	} catch (e) {
		console.error(e)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}
export async function DELETE(req: Request, context: ParamsContext) {
	try {
	  const id = await getId(context)
  
	  await prisma.productImage.deleteMany({
		where: { productId: id },
	  })
  
	  await prisma.product.delete({
		where: { id },
	  })
  
	  return NextResponse.json({ success: true })
	} catch (e: any) {
	  console.error('DELETE /products/[id] error:', e)
	  return NextResponse.json(
		{ error: 'Internal Server Error' },
		{ status: 500 }
	  )
	}
  }
  

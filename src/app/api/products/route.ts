import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  }
  
export async function POST(req: Request) {
    try {
      const data = await req.json();
  
      const product = await prisma.product.create({
        data: {
          title: data.title,
          description: data.description,
          composition: data.composition,
          care: data.care,
          price: data.price,
          inStock: data.inStock ?? true,
          images: {
            create: (data.images || []).map((img: { url: string }) => ({
              url: img.url
            }))
          },
        },
      });
  
      return NextResponse.json(product, { status: 201 });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
  }
  

import { PrismaClient } from '@prisma/client'
import { createSlug } from '../src/lib/slug'

const prisma = new PrismaClient()

async function main() {
  console.log('Начинаем миграцию slug...')

  // Проверяем, существует ли уже поле slug
  try {
    // Пытаемся проверить существование поля slug
    await prisma.$queryRaw`SELECT slug FROM "Product" LIMIT 1`
    console.log('Поле slug уже существует')
  } catch (error: any) {
    // Если поле slug не существует, создаем его
    if (error.message?.includes('столбец "slug" не существует') || error.message?.includes('column "slug" does not exist')) {
      console.log('Создаем поле slug...')
      
      await prisma.$executeRaw`
        ALTER TABLE "Product" ADD COLUMN "slug" TEXT
      `
    } else {
      throw error
    }
  }

  // Получаем все продукты через raw query
  const products = await prisma.$queryRaw<Array<{ id: string; title: string; slug: string | null }>>`
    SELECT id, title, slug FROM "Product"
  `

  console.log(`Найдено ${products.length} товаров`)

  // Обновляем товары без slug
  for (const product of products) {
    if (product.slug) {
      console.log(`Товар "${product.title}" уже имеет slug: ${product.slug}`)
      continue
    }

    const baseSlug = createSlug(product.title)
    let slug = baseSlug
    let counter = 1

    // Проверяем уникальность slug (используем raw query, так как Prisma Client может не знать о slug)
    let isUnique = false
    while (!isUnique) {
      const existing = await prisma.$queryRaw<Array<{ id: string }>>`
        SELECT id FROM "Product" WHERE slug = ${slug}
      `
      if (existing.length === 0) {
        isUnique = true
      } else {
        slug = `${baseSlug}-${counter}`
        counter++
      }
    }

    await prisma.$executeRaw`
      UPDATE "Product" SET slug = ${slug} WHERE id = ${product.id}
    `

    console.log(`Обновлен товар: ${product.title} -> ${slug}`)
  }

  // Делаем поле обязательным и уникальным
  try {
    console.log('Делаем поле slug обязательным и уникальным...')
    await prisma.$executeRaw`
      ALTER TABLE "Product" ALTER COLUMN "slug" SET NOT NULL
    `
    
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "Product_slug_key" ON "Product"("slug")
    `
  } catch (error: any) {
    if (!error.message?.includes('already exists')) {
      console.warn('Предупреждение при создании индекса:', error.message)
    }
  }

  console.log('Миграция завершена!')
}

main()
  .catch((e) => {
    console.error('Ошибка миграции:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


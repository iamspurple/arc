import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'

type Params = {
  params: Promise<{ id: string }>
}

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: true },
  })
  return product
}

export default async function ProductPage({ params }: Params) {
  const { id: slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="product-page">
      <div className="product-page__images">
        {product.images.map((image) => (
          <div key={image.id} className="product-page__image-wrapper">
            <Image
              src={image.url}
              alt={product.title}
              width={500}
              height={600}
              className="product-page__image"
            />
          </div>
        ))}
      </div>
      <div className="product-page__info">
        <h1 className="product-page__title">{product.title}</h1>
        {product.description && (
          <p className="product-page__description">{product.description}</p>
        )}
        {product.composition && (
          <p className="product-page__composition">
            <strong>Состав:</strong> {product.composition}
          </p>
        )}
        {product.care && (
          <p className="product-page__care">
            <strong>Уход:</strong> {product.care}
          </p>
        )}
        {product.sizes && (
          <p className="product-page__sizes">
            <strong>Размеры:</strong> {product.sizes}
          </p>
        )}
        <p className="product-page__price">
          {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₽
        </p>
        <p className="product-page__stock">
          {product.inStock ? 'В наличии' : 'Нет в наличии'}
        </p>
      </div>
    </div>
  )
}
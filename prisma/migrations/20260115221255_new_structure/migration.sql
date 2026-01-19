/*
  Warnings:

  - You are about to drop the column `inStock` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `alt` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropIndex
DROP INDEX "Product_slug_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "inStock",
DROP COLUMN "price",
DROP COLUMN "sizes",
DROP COLUMN "slug",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "productId",
DROP COLUMN "url",
ADD COLUMN     "alt" TEXT NOT NULL,
ADD COLUMN     "colorId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ProductColor" (
    "id" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "colorName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOption" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "parameters" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "ProductOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductColor" ADD CONSTRAINT "ProductColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "ProductColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "ProductColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

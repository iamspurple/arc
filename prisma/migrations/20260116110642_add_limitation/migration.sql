/*
  Warnings:

  - You are about to alter the column `description` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `composition` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `care` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `hex` on the `ProductColor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(12)`.
  - You are about to alter the column `colorName` on the `ProductColor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `alt` on the `ProductImage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `ProductOptions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `slug` on the `ProductOptions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `size` on the `ProductOptions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `parameters` on the `ProductOptions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "composition" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "care" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "ProductColor" ALTER COLUMN "hex" SET DATA TYPE VARCHAR(12),
ALTER COLUMN "colorName" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "ProductImage" ALTER COLUMN "alt" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "ProductOption" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "size" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "parameters" SET DATA TYPE VARCHAR(255);

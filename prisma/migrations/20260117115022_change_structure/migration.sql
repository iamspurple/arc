/*
  Warnings:

  - You are about to drop the column `color_id` on the `product_image` table. All the data in the column will be lost.
  - You are about to drop the column `color_id` on the `product_option` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `product_option` table. All the data in the column will be lost.
  - You are about to drop the column `parameters` on the `product_option` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `product_option` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `product_option` table. All the data in the column will be lost.
  - You are about to drop the `product_color` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `option_id` to the `product_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color_name` to the `product_option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hex` to the `product_option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_color" DROP CONSTRAINT "product_color_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_color_id_fkey";

-- DropForeignKey
ALTER TABLE "product_option" DROP CONSTRAINT "product_option_color_id_fkey";

-- AlterTable
ALTER TABLE "product_image" DROP COLUMN "color_id",
ADD COLUMN     "option_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_option" DROP COLUMN "color_id",
DROP COLUMN "order",
DROP COLUMN "parameters",
DROP COLUMN "quantity",
DROP COLUMN "size",
ADD COLUMN     "color_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "hex" VARCHAR(12) NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "product_color";

-- CreateTable
CREATE TABLE "product_size" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "size" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "parameters" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "option_id" TEXT NOT NULL,

    CONSTRAINT "product_size_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_option" ADD CONSTRAINT "product_option_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_size" ADD CONSTRAINT "product_size_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "product_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "product_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

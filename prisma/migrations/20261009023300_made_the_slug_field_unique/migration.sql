/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `product_option` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_option_slug_key" ON "product_option"("slug");

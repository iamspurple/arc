/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "number" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_number_key" ON "order"("number");

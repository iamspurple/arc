/*
  Warnings:

  - Made the column `description` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `composition` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `care` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "composition" SET NOT NULL,
ALTER COLUMN "care" SET NOT NULL;

/*
  Warnings:

  - The values [PENDING] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[article]` on the table `product_option` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `article` to the `product_option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('NEW', 'PROCESSING', 'COMPLETE', 'CANCELLED');
ALTER TABLE "public"."order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "order" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "product_option" ADD COLUMN     "article" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_option_article_key" ON "product_option"("article");

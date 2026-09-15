/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderProductOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProductOption" DROP CONSTRAINT "OrderProductOption_option_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderProductOption" DROP CONSTRAINT "OrderProductOption_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderProductOption" DROP CONSTRAINT "OrderProductOption_size_id_fkey";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderProductOption";

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "customer" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "contactWay" "ContactWay" NOT NULL DEFAULT 'EMAIL',
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_product_option" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_product_option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_product_option" ADD CONSTRAINT "order_product_option_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product_option" ADD CONSTRAINT "order_product_option_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product_option" ADD CONSTRAINT "order_product_option_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "product_size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

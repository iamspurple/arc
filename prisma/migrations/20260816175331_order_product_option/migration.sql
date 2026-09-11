-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ContactWay" AS ENUM ('EMAIL', 'WHATSAPP', 'TELEGRAM');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "customer" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "contactWay" "ContactWay" NOT NULL DEFAULT 'EMAIL',
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProductOption" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderProductOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProductOption" ADD CONSTRAINT "OrderProductOption_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProductOption" ADD CONSTRAINT "OrderProductOption_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProductOption" ADD CONSTRAINT "OrderProductOption_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "product_size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

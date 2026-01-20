-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_option_id_fkey";

-- DropForeignKey
ALTER TABLE "product_option" DROP CONSTRAINT "product_option_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_size" DROP CONSTRAINT "product_size_option_id_fkey";

-- AddForeignKey
ALTER TABLE "product_option" ADD CONSTRAINT "product_option_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_size" ADD CONSTRAINT "product_size_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

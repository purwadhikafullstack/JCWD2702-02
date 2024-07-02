-- AlterTable
ALTER TABLE `order` ADD COLUMN `shippingCost` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `weight` INTEGER NULL DEFAULT 1000;

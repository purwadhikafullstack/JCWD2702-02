/*
  Warnings:

  - You are about to drop the column `price` on the `carts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `shippingCost` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `price`;

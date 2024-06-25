/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Order_warehouseId_fkey` ON `Order`;

-- CreateIndex
CREATE UNIQUE INDEX `carts_id_key` ON `carts`(`id`);

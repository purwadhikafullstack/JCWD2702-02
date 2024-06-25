/*
  Warnings:

  - You are about to drop the `Warehouse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WarehouseStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cart_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_warehouseId_fkey`;

-- DropForeignKey
ALTER TABLE `WarehouseStock` DROP FOREIGN KEY `WarehouseStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `WarehouseStock` DROP FOREIGN KEY `WarehouseStock_warehouseId_fkey`;

-- DropForeignKey
ALTER TABLE `cart_items` DROP FOREIGN KEY `cart_items_productId_fkey`;

-- DropTable
DROP TABLE `Warehouse`;

-- DropTable
DROP TABLE `WarehouseStock`;

-- DropTable
DROP TABLE `cart_items`;

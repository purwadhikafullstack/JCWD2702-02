/*
  Warnings:

  - You are about to drop the column `warehouseId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `cart_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warehouse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warehousestock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart_items` DROP FOREIGN KEY `cart_items_productId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_warehouseId_fkey`;

-- DropForeignKey
ALTER TABLE `warehousestock` DROP FOREIGN KEY `WarehouseStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `warehousestock` DROP FOREIGN KEY `WarehouseStock_warehouseId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `warehouseId`;

-- DropTable
DROP TABLE `cart_items`;

-- DropTable
DROP TABLE `warehouse`;

-- DropTable
DROP TABLE `warehousestock`;

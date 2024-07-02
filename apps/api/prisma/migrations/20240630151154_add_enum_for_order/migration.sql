/*
  Warnings:

  - You are about to alter the column `status` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(7))`.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('PAID', 'WAITING_FOR_PAYMENT', 'WAITING_FOR_CONFIRMATION', 'CANCELLED') NOT NULL DEFAULT 'WAITING_FOR_PAYMENT';

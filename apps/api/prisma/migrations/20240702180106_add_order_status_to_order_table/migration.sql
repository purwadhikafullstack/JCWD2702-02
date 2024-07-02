/*
  Warnings:

  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(7))`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('PAID', 'WAITING_FOR_PAYMENT', 'WAITING_FOR_CONFIRMATION', 'CANCELLED') NULL DEFAULT 'WAITING_FOR_PAYMENT';

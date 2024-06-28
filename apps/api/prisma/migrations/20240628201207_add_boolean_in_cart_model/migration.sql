/*
  Warnings:

  - You are about to alter the column `selected` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(7))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `carts` MODIFY `selected` BOOLEAN NOT NULL DEFAULT true;

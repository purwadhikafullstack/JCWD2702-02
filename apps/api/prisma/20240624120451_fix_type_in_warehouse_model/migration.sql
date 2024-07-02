/*
  Warnings:

  - You are about to drop the column `proviceId` on the `warehouses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `warehouses` DROP COLUMN `proviceId`,
    ADD COLUMN `provinceId` INTEGER NULL;

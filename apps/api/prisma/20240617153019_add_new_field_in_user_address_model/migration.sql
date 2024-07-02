/*
  Warnings:

  - Added the required column `city` to the `user_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `user_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `user_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `user_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `user_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceId` to the `user_address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_address` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `cityId` INTEGER NOT NULL,
    ADD COLUMN `latitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `longitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `provinceId` INTEGER NOT NULL;

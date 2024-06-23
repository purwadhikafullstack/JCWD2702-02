/*
  Warnings:

  - You are about to alter the column `adminRole` on the `admins` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.

*/
-- AlterTable
ALTER TABLE `admins` MODIFY `adminRole` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_adminRole_fkey` FOREIGN KEY (`adminRole`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

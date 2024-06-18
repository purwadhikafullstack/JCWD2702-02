/*
  Warnings:

  - You are about to drop the column `from` on the `stock_history` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `stock_history` table. All the data in the column will be lost.
  - Added the required column `fromId` to the `stock_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toId` to the `stock_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stock_history` DROP COLUMN `from`,
    DROP COLUMN `to`,
    ADD COLUMN `fromId` INTEGER NOT NULL,
    ADD COLUMN `toId` INTEGER NOT NULL,
    MODIFY `status` ENUM('ACCEPTED', 'PENDING', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `stock_history` ADD CONSTRAINT `stock_history_fromId_fkey` FOREIGN KEY (`fromId`) REFERENCES `mutation_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_history` ADD CONSTRAINT `stock_history_toId_fkey` FOREIGN KEY (`toId`) REFERENCES `mutation_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

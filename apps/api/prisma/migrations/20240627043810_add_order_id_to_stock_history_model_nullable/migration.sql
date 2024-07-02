-- AlterTable
ALTER TABLE `stock_history` ADD COLUMN `orderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `stock_history` ADD CONSTRAINT `stock_history_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

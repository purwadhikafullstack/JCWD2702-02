-- AlterTable
ALTER TABLE `user_address` ADD COLUMN `main` ENUM('TRUE', 'FALSE') NOT NULL DEFAULT 'FALSE';

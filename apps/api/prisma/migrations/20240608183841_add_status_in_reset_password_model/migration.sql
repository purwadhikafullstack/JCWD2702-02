-- AlterTable
ALTER TABLE `user_reset_password` ADD COLUMN `status` ENUM('PENDING', 'DONE') NOT NULL DEFAULT 'PENDING';

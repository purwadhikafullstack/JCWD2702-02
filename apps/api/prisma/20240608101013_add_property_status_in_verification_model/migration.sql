-- AlterTable
ALTER TABLE `user_email_verification` ADD COLUMN `status` ENUM('PROGRESS', 'EXPIRED', 'DONE') NOT NULL DEFAULT 'PROGRESS';

-- AlterTable
ALTER TABLE `user_reset_password` ADD COLUMN `status` ENUM('PROGRESS', 'EXPIRED', 'DONE') NOT NULL DEFAULT 'PROGRESS';

-- AlterTable
ALTER TABLE `User_Reset_Password_History` MODIFY `status` ENUM('PENDING', 'DONE', 'EXPIRED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `user_email_verification` MODIFY `status` ENUM('PENDING', 'DONE', 'EXPIRED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `user_reset_password` MODIFY `status` ENUM('PENDING', 'DONE', 'EXPIRED') NOT NULL DEFAULT 'PENDING';

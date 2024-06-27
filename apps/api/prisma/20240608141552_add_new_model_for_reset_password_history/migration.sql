/*
  Warnings:

  - You are about to alter the column `status` on the `user_email_verification` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(4))`.
  - You are about to alter the column `status` on the `user_reset_password` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `user_email_verification` MODIFY `status` ENUM('PENDING', 'DONE') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `user_reset_password` MODIFY `status` ENUM('PENDING', 'DONE') NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE `User_Reset_Password_History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `resetId` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'DONE') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Reset_Password_History` ADD CONSTRAINT `User_Reset_Password_History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Reset_Password_History` ADD CONSTRAINT `User_Reset_Password_History_resetId_fkey` FOREIGN KEY (`resetId`) REFERENCES `user_reset_password`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

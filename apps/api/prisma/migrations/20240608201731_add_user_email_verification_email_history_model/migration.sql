/*
  Warnings:

  - You are about to drop the `User_Email_History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User_Email_History` DROP FOREIGN KEY `User_Email_History_resetId_fkey`;

-- DropForeignKey
ALTER TABLE `User_Email_History` DROP FOREIGN KEY `User_Email_History_userId_fkey`;

-- DropTable
DROP TABLE `User_Email_History`;

-- CreateTable
CREATE TABLE `User_Email_Verification_History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `resetId` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'DONE', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Email_Verification_History` ADD CONSTRAINT `User_Email_Verification_History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Email_Verification_History` ADD CONSTRAINT `User_Email_Verification_History_resetId_fkey` FOREIGN KEY (`resetId`) REFERENCES `user_reset_password`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

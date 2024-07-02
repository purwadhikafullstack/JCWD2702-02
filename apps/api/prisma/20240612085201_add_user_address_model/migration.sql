-- CreateTable
CREATE TABLE `user_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `recipients` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_address` ADD CONSTRAINT `user_address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

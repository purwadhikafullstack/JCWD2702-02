-- AlterTable
ALTER TABLE `users` ADD COLUMN `userImageUrl` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;

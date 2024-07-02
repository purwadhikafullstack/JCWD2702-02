-- AddForeignKey
ALTER TABLE `User_Reset_Password_History` ADD CONSTRAINT `User_Reset_Password_History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Reset_Password_History` ADD CONSTRAINT `User_Reset_Password_History_resetId_fkey` FOREIGN KEY (`resetId`) REFERENCES `user_reset_password`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

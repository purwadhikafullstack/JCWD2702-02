/*
  Warnings:

  - You are about to drop the column `resetId` on the `User_Email_Verification_History` table. All the data in the column will be lost.
  - Added the required column `verifId` to the `User_Email_Verification_History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User_Email_Verification_History` DROP FOREIGN KEY `User_Email_Verification_History_resetId_fkey`;

-- AlterTable
ALTER TABLE `User_Email_Verification_History` DROP COLUMN `resetId`,
    ADD COLUMN `verifId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User_Email_Verification_History` ADD CONSTRAINT `User_Email_Verification_History_verifId_fkey` FOREIGN KEY (`verifId`) REFERENCES `user_email_verification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

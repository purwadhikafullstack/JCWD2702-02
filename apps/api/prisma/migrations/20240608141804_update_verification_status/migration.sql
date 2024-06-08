/*
  Warnings:

  - You are about to drop the `User_Reset_Password_History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User_Reset_Password_History` DROP FOREIGN KEY `User_Reset_Password_History_resetId_fkey`;

-- DropForeignKey
ALTER TABLE `User_Reset_Password_History` DROP FOREIGN KEY `User_Reset_Password_History_userId_fkey`;

-- DropTable
DROP TABLE `User_Reset_Password_History`;

/*
  Warnings:

  - You are about to drop the column `Google` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `Google`,
    ADD COLUMN `google` ENUM('TRUE', 'FALSE') NOT NULL DEFAULT 'FALSE';

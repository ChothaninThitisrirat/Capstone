/*
  Warnings:

  - You are about to drop the column `card_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_card_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "card_id";

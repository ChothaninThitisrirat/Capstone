/*
  Warnings:

  - You are about to drop the column `follower` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "follow-follow_id";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "follow_follower_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "follower";

-- DropTable
DROP TABLE "Follow";

/*
  Warnings:

  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "follow-follow_id";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "follow_follower_id";

-- DropTable
DROP TABLE "Follow";

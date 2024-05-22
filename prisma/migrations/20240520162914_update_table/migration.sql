/*
  Warnings:

  - You are about to drop the column `time` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "time",
ADD COLUMN     "postdate" DATE;

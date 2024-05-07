/*
  Warnings:

  - Added the required column `title` to the `Review_Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Review_User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review_Book" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review_User" ADD COLUMN     "title" TEXT NOT NULL;

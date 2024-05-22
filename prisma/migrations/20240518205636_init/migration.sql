/*
  Warnings:

  - You are about to drop the column `datetime` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "datetime",
ADD COLUMN     "time" DATE;

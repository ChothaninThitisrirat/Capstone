/*
  Warnings:

  - Added the required column `address` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "req_address" TEXT;

/*
  Warnings:

  - The primary key for the `Trade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `req_book_id` on table `Trade` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_pkey",
ALTER COLUMN "req_book_id" SET NOT NULL,
ADD CONSTRAINT "Trade_pkey" PRIMARY KEY ("id", "book_id", "owner_id", "req_user_id", "req_book_id");

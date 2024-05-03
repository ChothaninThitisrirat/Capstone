/*
  Warnings:

  - You are about to drop the `Tradebook_want_Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tradebook_want_Category" DROP CONSTRAINT "Tradebook_want_Category-book_id";

-- DropForeignKey
ALTER TABLE "Tradebook_want_Category" DROP CONSTRAINT "Tradebook_want_Category-want_category";

-- DropTable
DROP TABLE "Tradebook_want_Category";

/*
  Warnings:

  - The primary key for the `Category_in_Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Category_in_Book` table. All the data in the column will be lost.
  - The primary key for the `Tradebook_want_Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tradebook_want_Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category_in_Book" DROP CONSTRAINT "Category_in_Book_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Category_in_Book_pkey" PRIMARY KEY ("book_id", "category_id");

-- AlterTable
ALTER TABLE "Tradebook_want_Category" DROP CONSTRAINT "Tradebook_want_Category_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Tradebook_want_Category_pkey" PRIMARY KEY ("want_category_id", "book_id");

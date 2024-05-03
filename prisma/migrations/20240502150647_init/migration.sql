/*
  Warnings:

  - You are about to drop the column `want_category` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "want_category";

-- CreateTable
CREATE TABLE "Tradebook_want_Category" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "want_category_id" INTEGER NOT NULL,

    CONSTRAINT "Tradebook_want_Category_pkey" PRIMARY KEY ("id","want_category_id","book_id")
);

-- AddForeignKey
ALTER TABLE "Tradebook_want_Category" ADD CONSTRAINT "Tradebook_want_Category-book_id" FOREIGN KEY ("book_id") REFERENCES "Book"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tradebook_want_Category" ADD CONSTRAINT "Tradebook_want_Category-want_category" FOREIGN KEY ("want_category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

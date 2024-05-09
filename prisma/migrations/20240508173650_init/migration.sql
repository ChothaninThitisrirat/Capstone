/*
  Warnings:

  - You are about to alter the column `title` on the `Review_Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "pickup" DROP NOT NULL,
ALTER COLUMN "datetime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Review_Book" ALTER COLUMN "title" SET DATA TYPE VARCHAR(20);

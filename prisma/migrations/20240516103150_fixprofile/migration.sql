/*
  Warnings:

  - You are about to alter the column `describe` on the `Review_Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Review_Book" ALTER COLUMN "describe" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_picture" SET DEFAULT 'https://dfmtboqfsygnjttfuvgq.supabase.co/storage/v1/object/public/b-trade/profile/default-user.jpg?t=2024-05-16T10%3A23%3A27.778Z';

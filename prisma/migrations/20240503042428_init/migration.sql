-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "trade-owner_id";

-- DropIndex
DROP INDEX "Book_user_id_key";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "book_user_id";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "book_user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

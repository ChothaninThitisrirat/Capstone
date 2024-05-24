-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "book_user_id";

-- DropForeignKey
ALTER TABLE "Review_Book" DROP CONSTRAINT "review_book-book_id";

-- DropForeignKey
ALTER TABLE "Review_Book" DROP CONSTRAINT "review_book-user_id";

-- DropForeignKey
ALTER TABLE "Review_User" DROP CONSTRAINT "review_user-reviewer_id";

-- DropForeignKey
ALTER TABLE "Review_User" DROP CONSTRAINT "review_user-user_id";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "trade-book_id";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "trade-owner_id";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "trade-req_book_id";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "trade-req_user_id";

-- DropForeignKey
ALTER TABLE "Userlike" DROP CONSTRAINT "Userlike-category_id";

-- DropForeignKey
ALTER TABLE "Userlike" DROP CONSTRAINT "Userlike-user_id";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "wishlist-book_id";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "wishlist-user_id";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "book_user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review_Book" ADD CONSTRAINT "review_book-book_id" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review_Book" ADD CONSTRAINT "review_book-user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "trade-book_id" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "trade-owner_id" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "trade-req_book_id" FOREIGN KEY ("req_book_id") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "trade-req_user_id" FOREIGN KEY ("req_user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review_User" ADD CONSTRAINT "review_user-reviewer_id" FOREIGN KEY ("reviewer_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review_User" ADD CONSTRAINT "review_user-user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "wishlist-book_id" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "wishlist-user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Userlike" ADD CONSTRAINT "Userlike-category_id" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Userlike" ADD CONSTRAINT "Userlike-user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

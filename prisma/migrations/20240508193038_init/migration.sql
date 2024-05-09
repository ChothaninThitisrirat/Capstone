-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "req_book_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "trade-req_book_id" FOREIGN KEY ("req_book_id") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

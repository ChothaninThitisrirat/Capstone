-- CreateTable
CREATE TABLE "Userlike" (
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Userlike_pkey" PRIMARY KEY ("user_id","category_id")
);

-- AddForeignKey
ALTER TABLE "Userlike" ADD CONSTRAINT "Userlike-user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Userlike" ADD CONSTRAINT "Userlike-category_id" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

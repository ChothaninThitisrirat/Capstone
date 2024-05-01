-- CreateTable
CREATE TABLE "Book" (
    "Id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "picture" TEXT[],
    "in_libary" BOOLEAN NOT NULL,
    "pickup" TEXT NOT NULL,
    "want_category" TEXT,
    "datetime" DATE NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("Id","user_id")
);

-- CreateTable
CREATE TABLE "Review_Book" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score" DECIMAL(1,0) NOT NULL,
    "describe" TEXT,

    CONSTRAINT "Review_Book_pkey" PRIMARY KEY ("id","book_id","user_id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "req_user_id" INTEGER NOT NULL,
    "datetime" DATE NOT NULL,
    "return_date" VARCHAR(6) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "pickup_req" TEXT,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id","book_id","owner_id","req_user_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "last_name" VARCHAR(20) NOT NULL,
    "profile_picture" TEXT,
    "phone_number" VARCHAR(10) NOT NULL,
    "card_id" VARCHAR(13) NOT NULL,
    "instagram" VARCHAR(20),
    "facebook" VARCHAR(20),
    "line" VARCHAR(20),
    "follower" INTEGER DEFAULT 0,
    "address" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category_in_Book" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Category_in_Book_pkey" PRIMARY KEY ("id","book_id","category_id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "follow_id" INTEGER NOT NULL,
    "follower_id" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id","follow_id","follower_id")
);

-- CreateTable
CREATE TABLE "Review_User" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reviewer_id" INTEGER NOT NULL,
    "score" DECIMAL(1,0) NOT NULL,
    "describe" TEXT,

    CONSTRAINT "Review_User_pkey" PRIMARY KEY ("id","user_id","reviewer_id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id","user_id","book_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_Id_key" ON "Book"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Book_user_id_key" ON "Book"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_card_id_key" ON "User"("card_id");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "book_user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Review_Book" ADD CONSTRAINT "review_book-book_id" FOREIGN KEY ("book_id") REFERENCES "Book"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Review_Book" ADD CONSTRAINT "review_book-user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "trade-book_id" FOREIGN KEY ("book_id") REFERENCES "Book"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "trade-owner_id" FOREIGN KEY ("owner_id") REFERENCES "Book"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "trade-req_user_id" FOREIGN KEY ("req_user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category_in_Book" ADD CONSTRAINT "cat_in_book-book_id" FOREIGN KEY ("book_id") REFERENCES "Book"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category_in_Book" ADD CONSTRAINT "cat_in_book-category_id" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "follow-follow_id" FOREIGN KEY ("follow_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "follow_follower_id" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Review_User" ADD CONSTRAINT "review_user-reviewer_id" FOREIGN KEY ("reviewer_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Review_User" ADD CONSTRAINT "review_user-user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "wishlist-book_id" FOREIGN KEY ("book_id") REFERENCES "Book"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "wishlist-user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

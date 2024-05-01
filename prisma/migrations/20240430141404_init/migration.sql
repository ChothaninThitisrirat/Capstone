-- DropIndex
DROP INDEX "User_card_id_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_phone_number_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "facebook" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "follow_id" INTEGER NOT NULL,
    "follower_id" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id","follow_id","follower_id")
);

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "follow-follow_id" FOREIGN KEY ("follow_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "follow_follower_id" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

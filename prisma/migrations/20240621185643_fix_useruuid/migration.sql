/*
  Warnings:

  - You are about to drop the column `comment_uuid` on the `comment` table. All the data in the column will be lost.
  - Added the required column `user_uuid` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_comment_uuid_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "comment_uuid",
ADD COLUMN     "user_uuid" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

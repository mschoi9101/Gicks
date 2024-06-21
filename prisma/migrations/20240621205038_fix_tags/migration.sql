/*
  Warnings:

  - You are about to drop the `_ContentToTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contentUuid` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ContentToTags" DROP CONSTRAINT "_ContentToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentToTags" DROP CONSTRAINT "_ContentToTags_B_fkey";

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "contentUuid" UUID NOT NULL;

-- DropTable
DROP TABLE "_ContentToTags";

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_contentUuid_fkey" FOREIGN KEY ("contentUuid") REFERENCES "content"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

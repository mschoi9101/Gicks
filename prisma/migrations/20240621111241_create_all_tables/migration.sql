/*
  Warnings:

  - You are about to drop the `place` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "place";

-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "major" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "content" (
    "uuid" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "headcount" INTEGER NOT NULL,
    "author_id" UUID NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruit" (
    "id" SERIAL NOT NULL,
    "content_uuid" UUID NOT NULL,
    "user_uuid" UUID NOT NULL,

    CONSTRAINT "recruit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "content_uuid" UUID NOT NULL,
    "uuid" UUID NOT NULL,
    "comment_content" TEXT NOT NULL,
    "comment_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "_ContentToTags" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_tag_key" ON "tag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "comment_uuid_key" ON "comment"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentToTags_AB_unique" ON "_ContentToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentToTags_B_index" ON "_ContentToTags"("B");

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruit" ADD CONSTRAINT "recruit_content_uuid_fkey" FOREIGN KEY ("content_uuid") REFERENCES "content"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruit" ADD CONSTRAINT "recruit_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_content_uuid_fkey" FOREIGN KEY ("content_uuid") REFERENCES "content"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_comment_uuid_fkey" FOREIGN KEY ("comment_uuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToTags" ADD CONSTRAINT "_ContentToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "content"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToTags" ADD CONSTRAINT "_ContentToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

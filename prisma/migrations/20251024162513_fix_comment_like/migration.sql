/*
  Warnings:

  - You are about to drop the column `commmentId` on the `CommentLike` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,commentId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commentId` to the `CommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_commmentId_fkey";

-- DropIndex
DROP INDEX "CommentLike_userId_commmentId_key";

-- AlterTable
ALTER TABLE "CommentLike" DROP COLUMN "commmentId",
ADD COLUMN     "commentId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Comment_videoId_commentId_idx" ON "Comment"("videoId", "commentId");

-- CreateIndex
CREATE INDEX "CommentLike_userId_commentId_idx" ON "CommentLike"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_userId_commentId_key" ON "CommentLike"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

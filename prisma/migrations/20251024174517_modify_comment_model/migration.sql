-- DropIndex
DROP INDEX "Comment_videoId_commentId_idx";

-- CreateIndex
CREATE INDEX "Comment_videoId_idx" ON "Comment"("videoId");

-- CreateIndex
CREATE INDEX "Comment_commentId_idx" ON "Comment"("commentId");

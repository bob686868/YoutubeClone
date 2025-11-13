/*
  Warnings:

  - A unique constraint covering the columns `[watchHistoryId,videoId]` on the table `WatchHistoryVideo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchHistoryVideo_watchHistoryId_videoId_key" ON "WatchHistoryVideo"("watchHistoryId", "videoId");

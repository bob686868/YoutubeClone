/*
  Warnings:

  - You are about to drop the `_VideoToWatchHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_VideoToWatchHistory" DROP CONSTRAINT "_VideoToWatchHistory_A_fkey";

-- DropForeignKey
ALTER TABLE "_VideoToWatchHistory" DROP CONSTRAINT "_VideoToWatchHistory_B_fkey";

-- AlterTable
ALTER TABLE "WatchHistory" ADD COLUMN     "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_VideoToWatchHistory";

-- CreateTable
CREATE TABLE "WatchHistoryVideo" (
    "id" SERIAL NOT NULL,
    "watchLaterId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "watchetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchHistoryVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WatchHistoryVideo_videoId_watchLaterId_idx" ON "WatchHistoryVideo"("videoId", "watchLaterId");

-- AddForeignKey
ALTER TABLE "WatchHistoryVideo" ADD CONSTRAINT "WatchHistoryVideo_watchLaterId_fkey" FOREIGN KEY ("watchLaterId") REFERENCES "WatchHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchHistoryVideo" ADD CONSTRAINT "WatchHistoryVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

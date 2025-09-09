/*
  Warnings:

  - You are about to drop the column `watchLaterId` on the `WatchHistoryVideo` table. All the data in the column will be lost.
  - You are about to drop the `_VideoToWatchLater` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `watchHistoryId` to the `WatchHistoryVideo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WatchHistoryVideo" DROP CONSTRAINT "WatchHistoryVideo_watchLaterId_fkey";

-- DropForeignKey
ALTER TABLE "_VideoToWatchLater" DROP CONSTRAINT "_VideoToWatchLater_A_fkey";

-- DropForeignKey
ALTER TABLE "_VideoToWatchLater" DROP CONSTRAINT "_VideoToWatchLater_B_fkey";

-- DropIndex
DROP INDEX "WatchHistoryVideo_videoId_watchLaterId_idx";

-- AlterTable
ALTER TABLE "WatchHistoryVideo" DROP COLUMN "watchLaterId",
ADD COLUMN     "watchHistoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_VideoToWatchLater";

-- CreateTable
CREATE TABLE "WatchLaterVideo" (
    "id" SERIAL NOT NULL,
    "watchLaterId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "watchetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchLaterVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WatchLaterVideo_watchLaterId_videoId_idx" ON "WatchLaterVideo"("watchLaterId", "videoId");

-- CreateIndex
CREATE INDEX "WatchHistoryVideo_watchHistoryId_videoId_idx" ON "WatchHistoryVideo"("watchHistoryId", "videoId");

-- AddForeignKey
ALTER TABLE "WatchHistoryVideo" ADD CONSTRAINT "WatchHistoryVideo_watchHistoryId_fkey" FOREIGN KEY ("watchHistoryId") REFERENCES "WatchHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchLaterVideo" ADD CONSTRAINT "WatchLaterVideo_watchLaterId_fkey" FOREIGN KEY ("watchLaterId") REFERENCES "WatchLater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchLaterVideo" ADD CONSTRAINT "WatchLaterVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

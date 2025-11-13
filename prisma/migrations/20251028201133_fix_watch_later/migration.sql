/*
  Warnings:

  - You are about to drop the `WatchLaterVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WatchLaterVideo" DROP CONSTRAINT "WatchLaterVideo_videoId_fkey";

-- DropForeignKey
ALTER TABLE "WatchLaterVideo" DROP CONSTRAINT "WatchLaterVideo_watchLaterId_fkey";

-- DropTable
DROP TABLE "WatchLaterVideo";

-- CreateTable
CREATE TABLE "_VideoToWatchLater" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VideoToWatchLater_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VideoToWatchLater_B_index" ON "_VideoToWatchLater"("B");

-- AddForeignKey
ALTER TABLE "_VideoToWatchLater" ADD CONSTRAINT "_VideoToWatchLater_A_fkey" FOREIGN KEY ("A") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoToWatchLater" ADD CONSTRAINT "_VideoToWatchLater_B_fkey" FOREIGN KEY ("B") REFERENCES "WatchLater"("id") ON DELETE CASCADE ON UPDATE CASCADE;

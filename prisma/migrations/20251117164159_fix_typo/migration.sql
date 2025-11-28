/*
  Warnings:

  - You are about to drop the column `watchetAt` on the `WatchHistoryVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WatchHistoryVideo" DROP COLUMN "watchetAt",
ADD COLUMN     "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - You are about to drop the `_ViewedVideos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ViewedVideos" DROP CONSTRAINT "_ViewedVideos_A_fkey";

-- DropForeignKey
ALTER TABLE "_ViewedVideos" DROP CONSTRAINT "_ViewedVideos_B_fkey";

-- DropTable
DROP TABLE "_ViewedVideos";

-- CreateTable
CREATE TABLE "View" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "View_videoId_idx" ON "View"("videoId");

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

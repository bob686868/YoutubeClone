/*
  Warnings:

  - Added the required column `uploaderId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_videoId_fkey";

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "uploaderId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Subscriber" (
    "subscriberId" INTEGER NOT NULL,
    "subscribedToId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("subscriberId","subscribedToId")
);

-- CreateTable
CREATE TABLE "_ViewedVideos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ViewedVideos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ViewedVideos_B_index" ON "_ViewedVideos"("B");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_subscribedToId_fkey" FOREIGN KEY ("subscribedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ViewedVideos" ADD CONSTRAINT "_ViewedVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ViewedVideos" ADD CONSTRAINT "_ViewedVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("videoId") ON DELETE CASCADE ON UPDATE CASCADE;

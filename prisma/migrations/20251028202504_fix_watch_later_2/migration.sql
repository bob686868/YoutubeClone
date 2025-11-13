/*
  Warnings:

  - You are about to drop the column `userID` on the `WatchLater` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `WatchLater` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "WatchLater" DROP CONSTRAINT "WatchLater_userID_fkey";

-- DropIndex
DROP INDEX "WatchLater_userID_key";

-- AlterTable
ALTER TABLE "WatchLater" DROP COLUMN "userID",
ADD COLUMN     "userId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WatchLater_userId_key" ON "WatchLater"("userId");

-- CreateIndex
CREATE INDEX "WatchLater_userId_idx" ON "WatchLater"("userId");

-- AddForeignKey
ALTER TABLE "WatchLater" ADD CONSTRAINT "WatchLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "WatchLater" DROP CONSTRAINT "WatchLater_userId_fkey";

-- AlterTable
ALTER TABLE "WatchLater" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT;
DROP SEQUENCE "WatchLater_userId_seq";

-- AddForeignKey
ALTER TABLE "WatchLater" ADD CONSTRAINT "WatchLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

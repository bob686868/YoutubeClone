-- CreateTable
CREATE TABLE "WatchHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VideoToWatchHistory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VideoToWatchHistory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "WatchHistory_userId_key" ON "WatchHistory"("userId");

-- CreateIndex
CREATE INDEX "_VideoToWatchHistory_B_index" ON "_VideoToWatchHistory"("B");

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoToWatchHistory" ADD CONSTRAINT "_VideoToWatchHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoToWatchHistory" ADD CONSTRAINT "_VideoToWatchHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "WatchHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

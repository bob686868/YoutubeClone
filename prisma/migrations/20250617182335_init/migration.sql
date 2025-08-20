-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "channelName" TEXT NOT NULL,
    "profilePhoto" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "videoId" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("videoId")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Publication` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `medias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_postId_fkey";

-- AlterTable
ALTER TABLE "medias" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Posts";

-- DropTable
DROP TABLE "Publication";

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication" (
    "id" SERIAL NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `_MusicToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MusicToPost" DROP CONSTRAINT "_MusicToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_MusicToPost" DROP CONSTRAINT "_MusicToPost_B_fkey";

-- AlterTable
ALTER TABLE "Music" ADD COLUMN     "postId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_MusicToPost";

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

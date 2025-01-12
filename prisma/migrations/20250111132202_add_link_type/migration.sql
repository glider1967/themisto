/*
  Warnings:

  - You are about to drop the column `url` on the `Music` table. All the data in the column will be lost.
  - Added the required column `linkType` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VideoLinkType" AS ENUM ('YOUTUBE', 'NICONICO', 'OTHER_URL', 'NONE');

-- AlterTable
ALTER TABLE "Music" DROP COLUMN "url",
ADD COLUMN     "linkContent" TEXT,
ADD COLUMN     "linkType" "VideoLinkType" NOT NULL;

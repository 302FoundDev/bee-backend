/*
  Warnings:

  - You are about to drop the column `originalUrl` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `shortenedUrl` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Url_shortenedUrl_key";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "originalUrl",
DROP COLUMN "shortenedUrl",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_slug_key" ON "Url"("slug");

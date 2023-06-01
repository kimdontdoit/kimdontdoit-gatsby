/*
  Warnings:

  - You are about to drop the `PostMeta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `meta` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostMeta" DROP CONSTRAINT "PostMeta_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "meta" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "config" TEXT;

-- DropTable
DROP TABLE "PostMeta";

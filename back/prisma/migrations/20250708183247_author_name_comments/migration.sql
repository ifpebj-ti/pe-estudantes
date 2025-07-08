/*
  Warnings:

  - Added the required column `author_name` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "author_name" TEXT NOT NULL;

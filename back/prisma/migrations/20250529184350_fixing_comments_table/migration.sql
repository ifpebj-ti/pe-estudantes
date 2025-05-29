/*
  Warnings:

  - Added the required column `id_author` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "id_author" INTEGER NOT NULL;

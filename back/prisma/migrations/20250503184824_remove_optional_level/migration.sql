/*
  Warnings:

  - Made the column `id_level` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_level_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id_level" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_level_fkey" FOREIGN KEY ("id_level") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

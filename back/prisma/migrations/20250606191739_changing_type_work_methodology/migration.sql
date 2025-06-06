/*
  Warnings:

  - Changed the type of `work_methodology` on the `PlansEducation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PlansEducation" DROP COLUMN "work_methodology",
ADD COLUMN     "work_methodology" JSONB NOT NULL;

/*
  Warnings:

  - Added the required column `id_current_phase` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id_current_phase" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentPhases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "CurrentPhases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anmnesis" (
    "id" SERIAL NOT NULL,
    "identification" JSONB NOT NULL,
    "family_data" JSONB NOT NULL,
    "family_conditions" JSONB NOT NULL,
    "mother_background" JSONB NOT NULL,
    "verbal_language_three_years" JSONB NOT NULL,
    "development" JSONB NOT NULL,
    "sexuality" JSONB NOT NULL,
    "student_assessment" JSONB NOT NULL,
    "student_development" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Anmnesis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_current_phase_fkey" FOREIGN KEY ("id_current_phase") REFERENCES "CurrentPhases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

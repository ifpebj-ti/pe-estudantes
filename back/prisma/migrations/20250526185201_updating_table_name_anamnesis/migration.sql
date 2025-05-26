/*
  Warnings:

  - You are about to drop the `Anmnesis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Anmnesis";

-- CreateTable
CREATE TABLE "Anamnesis" (
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

    CONSTRAINT "Anamnesis_pkey" PRIMARY KEY ("id")
);

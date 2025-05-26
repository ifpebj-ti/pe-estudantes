/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Anamnesis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Anamnesis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_information` to the `Anamnesis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anamnesis" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "school_information" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Anamnesis_email_key" ON "Anamnesis"("email");

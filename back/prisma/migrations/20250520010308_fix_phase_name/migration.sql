/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CurrentPhases` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CurrentPhases_name_key" ON "CurrentPhases"("name");

-- CreateTable
CREATE TABLE "Screening" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "report" TEXT,
    "specific_need" JSONB NOT NULL,
    "special_service" BOOLEAN NOT NULL,
    "physical_disability" JSONB NOT NULL,
    "visual_impairment" JSONB NOT NULL,
    "hearing_impairment" JSONB NOT NULL,
    "global_disorder" JSONB NOT NULL,
    "other_disabilities" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Screening_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Screening_email_key" ON "Screening"("email");

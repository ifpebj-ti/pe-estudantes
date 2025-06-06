-- CreateTable
CREATE TABLE "PlansEducation" (
    "id" SERIAL NOT NULL,
    "professor_email" TEXT NOT NULL,
    "professor_name" TEXT NOT NULL,
    "student_email" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "academic_semester" JSONB NOT NULL,
    "service_modality" JSONB NOT NULL,
    "support_service" JSONB NOT NULL,
    "skills" JSONB NOT NULL,
    "resource_equipment_used" JSONB NOT NULL,
    "resource_equipment_needs" JSONB NOT NULL,
    "curriculum_accessibility" JSONB NOT NULL,
    "school_content" TEXT NOT NULL,
    "activities_to_be_developed" JSONB NOT NULL,
    "objectives" TEXT NOT NULL,
    "work_methodology" TEXT NOT NULL,
    "materials_used" JSONB NOT NULL,
    "evaluation_criteria" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "PlansEducation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlansEducation_student_email_key" ON "PlansEducation"("student_email");

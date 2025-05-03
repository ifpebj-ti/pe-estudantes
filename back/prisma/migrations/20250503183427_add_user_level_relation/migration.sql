-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id_level" INTEGER;

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_level_fkey" FOREIGN KEY ("id_level") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

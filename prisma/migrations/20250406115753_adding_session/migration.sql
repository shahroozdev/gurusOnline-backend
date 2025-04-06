-- AlterTable
ALTER TABLE "course_enrollments" ADD COLUMN     "sessionId" INTEGER;

-- AlterTable
ALTER TABLE "course_teachers" ADD COLUMN     "sessionId" INTEGER;

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "materials" TEXT[],
    "meetingUrl" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "enrollmentId" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "course_enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

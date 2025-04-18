-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "averageRating" DOUBLE PRECISION DEFAULT 4.0;

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "profileId" INTEGER NOT NULL,
    "ratedById" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_ratedById_fkey" FOREIGN KEY ("ratedById") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

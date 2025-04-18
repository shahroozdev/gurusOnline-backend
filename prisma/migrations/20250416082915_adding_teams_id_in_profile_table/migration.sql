/*
  Warnings:

  - A unique constraint covering the columns `[teamsId]` on the table `profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "teamsId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profile_teamsId_key" ON "profile"("teamsId");

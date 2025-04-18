/*
  Warnings:

  - Added the required column `preferedTime` to the `student_leads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_leads" ADD COLUMN     "preferedTime" TEXT NOT NULL;

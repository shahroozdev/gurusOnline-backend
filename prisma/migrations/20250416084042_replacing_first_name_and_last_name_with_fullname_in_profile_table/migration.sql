/*
  Warnings:

  - You are about to drop the column `firstName` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "fullname" TEXT;

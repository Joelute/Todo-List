/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Diaries` table. All the data in the column will be lost.
  - Added the required column `date` to the `Diaries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diaries" DROP COLUMN "timestamp",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

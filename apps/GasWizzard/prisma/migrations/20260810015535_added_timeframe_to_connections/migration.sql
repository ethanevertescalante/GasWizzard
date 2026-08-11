/*
  Warnings:

  - Added the required column `timeframe` to the `Connections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connections" ADD COLUMN     "timeframe" TEXT NOT NULL;

/*
  Warnings:

  - Changed the type of `numberOfTrips` on the `Connections` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Connections" DROP COLUMN "numberOfTrips",
ADD COLUMN     "numberOfTrips" INTEGER NOT NULL;

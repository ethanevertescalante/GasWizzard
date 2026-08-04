-- CreateTable
CREATE TABLE "pins" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pinUsername" TEXT NOT NULL,
    "pinName" TEXT,
    "pinAddress" TEXT NOT NULL,
    "pinLat" DOUBLE PRECISION NOT NULL,
    "pinLng" DOUBLE PRECISION NOT NULL,
    "markerType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "pins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pins_userId_idx" ON "pins"("userId");

-- AddForeignKey
ALTER TABLE "pins" ADD CONSTRAINT "pins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

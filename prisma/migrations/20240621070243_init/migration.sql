-- CreateTable
CREATE TABLE "place" (
    "uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "placeUrl" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "place_pkey" PRIMARY KEY ("uuid")
);

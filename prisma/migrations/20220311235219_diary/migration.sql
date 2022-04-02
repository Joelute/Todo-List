-- CreateTable
CREATE TABLE "Diaries" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "Diaries_pkey" PRIMARY KEY ("id")
);

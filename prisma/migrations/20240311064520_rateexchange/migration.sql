-- CreateTable
CREATE TABLE "exchangeRate" (
    "id" SERIAL NOT NULL,
    "exchangeRate" DOUBLE PRECISION NOT NULL,
    "lastRefreshed" TIMESTAMP(3) NOT NULL,
    "bidPrice" DOUBLE PRECISION NOT NULL,
    "askPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "exchangeRate_pkey" PRIMARY KEY ("id")
);

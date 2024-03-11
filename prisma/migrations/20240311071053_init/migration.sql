/*
  Warnings:

  - Added the required column `fromCurrency` to the `exchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toCurrency` to the `exchangeRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exchangeRate" ADD COLUMN     "fromCurrency" TEXT NOT NULL,
ADD COLUMN     "toCurrency" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `Amount` on the `Accounts` table. All the data in the column will be lost.
  - Added the required column `Amount` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "Amount";

-- AlterTable
ALTER TABLE "Currency" ADD COLUMN     "Amount" INTEGER NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[no]` on the table `mint_records` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `no` to the `mint_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mint_records" ADD COLUMN     "no" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "mint_records_no_key" ON "mint_records"("no");

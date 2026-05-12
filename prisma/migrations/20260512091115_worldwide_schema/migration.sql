/*
  Warnings:

  - You are about to drop the column `state` on the `constituencies` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `constituencies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,stateId,electionTypeId]` on the table `constituencies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,countryId]` on the table `parties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `electionTypeId` to the `constituencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `constituencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `parties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ElectionLevel" AS ENUM ('NATIONAL', 'STATE', 'LOCAL');

-- DropIndex
DROP INDEX "constituencies_name_state_type_key";

-- DropIndex
DROP INDEX "parties_name_key";

-- AlterTable
ALTER TABLE "constituencies" DROP COLUMN "state",
DROP COLUMN "type",
ADD COLUMN     "electionTypeId" TEXT NOT NULL,
ADD COLUMN     "stateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "parties" ADD COLUMN     "countryId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ConstituencyType";

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "flagUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "election_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "ElectionLevel" NOT NULL,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "election_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "states_name_countryId_key" ON "states"("name", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "election_types_name_countryId_key" ON "election_types"("name", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "constituencies_name_stateId_electionTypeId_key" ON "constituencies"("name", "stateId", "electionTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "parties_name_countryId_key" ON "parties"("name", "countryId");

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "election_types" ADD CONSTRAINT "election_types_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "constituencies" ADD CONSTRAINT "constituencies_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "constituencies" ADD CONSTRAINT "constituencies_electionTypeId_fkey" FOREIGN KEY ("electionTypeId") REFERENCES "election_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

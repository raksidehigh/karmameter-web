-- CreateTable
CREATE TABLE "portals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "type" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastScrapedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "id" TEXT NOT NULL,
    "portalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "documentUrl" TEXT,
    "fileHash" TEXT,
    "status" TEXT NOT NULL DEFAULT 'FETCHED',
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingestion_logs" (
    "id" TEXT NOT NULL,
    "portalId" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "recordsFetched" INTEGER NOT NULL DEFAULT 0,
    "recordsInserted" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "triggeredBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingestion_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "portals_name_key" ON "portals"("name");

-- CreateIndex
CREATE INDEX "records_portalId_idx" ON "records"("portalId");

-- CreateIndex
CREATE INDEX "records_fileHash_idx" ON "records"("fileHash");

-- CreateIndex
CREATE INDEX "ingestion_logs_portalId_startedAt_idx" ON "ingestion_logs"("portalId", "startedAt");

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_portalId_fkey" FOREIGN KEY ("portalId") REFERENCES "portals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingestion_logs" ADD CONSTRAINT "ingestion_logs_portalId_fkey" FOREIGN KEY ("portalId") REFERENCES "portals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

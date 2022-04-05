-- CreateTable
CREATE TABLE "subjects" (
    "id" SERIAL NOT NULL,
    "no" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "issuer" VARCHAR(50) NOT NULL,
    "brand" VARCHAR(50) NOT NULL,
    "status" SMALLINT NOT NULL,
    "salesTime" TIMESTAMPTZ(6) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" SERIAL NOT NULL,
    "no" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "issueTotal" INTEGER NOT NULL,
    "issueRemain" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(1000) NOT NULL,
    "hash" VARCHAR(100) NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mint_records" (
    "id" SERIAL NOT NULL,
    "status" SMALLINT NOT NULL,
    "response" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "mint_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subjects_no_key" ON "subjects"("no");

-- CreateIndex
CREATE INDEX "subjects_no_salesTime_idx" ON "subjects"("no", "salesTime");

-- CreateIndex
CREATE INDEX "subjects_salesTime_idx" ON "subjects"("salesTime");

-- CreateIndex
CREATE UNIQUE INDEX "collections_no_key" ON "collections"("no");

-- CreateIndex
CREATE UNIQUE INDEX "collections_resourceId_key" ON "collections"("resourceId");

-- CreateIndex
CREATE INDEX "collections_no_idx" ON "collections"("no");

-- CreateIndex
CREATE INDEX "collections_subjectId_idx" ON "collections"("subjectId");

-- CreateIndex
CREATE INDEX "collections_resourceId_idx" ON "collections"("resourceId");

-- CreateIndex
CREATE INDEX "resources_hash_idx" ON "resources"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "mint_records_collectionId_key" ON "mint_records"("collectionId");

-- CreateIndex
CREATE INDEX "mint_records_userId_idx" ON "mint_records"("userId");

-- CreateIndex
CREATE INDEX "mint_records_collectionId_idx" ON "mint_records"("collectionId");

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mint_records" ADD CONSTRAINT "mint_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mint_records" ADD CONSTRAINT "mint_records_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

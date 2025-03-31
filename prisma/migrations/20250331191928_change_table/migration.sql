/*
  Warnings:

  - You are about to drop the `Todoitem-table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todoitem-table";

-- CreateTable
CREATE TABLE "Todotask@table" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Todotask@table_pkey" PRIMARY KEY ("id")
);

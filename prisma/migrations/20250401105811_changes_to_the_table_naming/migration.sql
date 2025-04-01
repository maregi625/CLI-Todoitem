/*
  Warnings:

  - You are about to drop the `Todotask@table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todotask@table";

-- CreateTable
CREATE TABLE "todo_tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "todo_tasks_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the column `Todoitem` on the `Todoitem-table` table. All the data in the column will be lost.
  - You are about to drop the column `deleteallTodoitem` on the `Todoitem-table` table. All the data in the column will be lost.
  - You are about to drop the column `deletespecificTodoitem` on the `Todoitem-table` table. All the data in the column will be lost.
  - You are about to drop the column `readallTodoitem` on the `Todoitem-table` table. All the data in the column will be lost.
  - You are about to drop the column `readaspecificTodoitem` on the `Todoitem-table` table. All the data in the column will be lost.
  - You are about to drop the column `updateTodoitem` on the `Todoitem-table` table. All the data in the column will be lost.
  - Added the required column `description` to the `Todoitem-table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Todoitem-table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Todoitem-table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Todoitem-table` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Todoitem-table_deletespecificTodoitem_key";

-- DropIndex
DROP INDEX "Todoitem-table_readaspecificTodoitem_key";

-- AlterTable
ALTER TABLE "Todoitem-table" DROP COLUMN "Todoitem",
DROP COLUMN "deleteallTodoitem",
DROP COLUMN "deletespecificTodoitem",
DROP COLUMN "readallTodoitem",
DROP COLUMN "readaspecificTodoitem",
DROP COLUMN "updateTodoitem",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "Todoitem-table_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Todoitem-table" (
    "Todoitem" TEXT NOT NULL,
    "updateTodoitem" TEXT NOT NULL,
    "readallTodoitem" TEXT NOT NULL,
    "readaspecificTodoitem" TEXT NOT NULL,
    "deletespecificTodoitem" TEXT NOT NULL,
    "deleteallTodoitem" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Todoitem-table_readaspecificTodoitem_key" ON "Todoitem-table"("readaspecificTodoitem");

-- CreateIndex
CREATE UNIQUE INDEX "Todoitem-table_deletespecificTodoitem_key" ON "Todoitem-table"("deletespecificTodoitem");

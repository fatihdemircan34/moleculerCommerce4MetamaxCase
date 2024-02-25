/*
  Warnings:

  - You are about to drop the column `clientName` on the `Order` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalProductValue" REAL NOT NULL,
    "totalShippingValue" REAL NOT NULL,
    "clientAddress" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("clientAddress", "clientId", "id", "totalProductValue", "totalShippingValue") SELECT "clientAddress", "clientId", "id", "totalProductValue", "totalShippingValue" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

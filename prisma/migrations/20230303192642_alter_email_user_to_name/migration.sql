/*
  Warnings:

  - You are about to drop the column `user` on the `emails` table. All the data in the column will be lost.
  - Added the required column `name` to the `emails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_emails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_emails" ("email", "id", "password") SELECT "email", "id", "password" FROM "emails";
DROP TABLE "emails";
ALTER TABLE "new_emails" RENAME TO "emails";
CREATE UNIQUE INDEX "emails_email_key" ON "emails"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

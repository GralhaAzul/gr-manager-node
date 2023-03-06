-- CreateTable
CREATE TABLE "emails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "emails_email_key" ON "emails"("email");

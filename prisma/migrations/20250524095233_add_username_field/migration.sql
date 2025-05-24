/*
  Warnings:

  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "userID" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
-- Generate usernames from names (lowercase, replace spaces with underscores)
INSERT INTO "new_User" ("avatar", "created_at", "email", "id", "isVerified", "name", "username", "password", "phone", "updated_at", "userID") 
SELECT "avatar", "created_at", "email", "id", "isVerified", "name", LOWER(REPLACE("name", ' ', '_')), "password", "phone", "updated_at", "userID" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

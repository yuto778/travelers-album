/*
  Warnings:

  - The primary key for the `Tripboards_Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reqestion` on the `Tripboards_Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tripboards_Users" DROP CONSTRAINT "Tripboards_Users_pkey",
DROP COLUMN "reqestion",
ADD COLUMN     "requestion" BOOLEAN,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "Tripboards_Users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tripboards_Users_id_seq";

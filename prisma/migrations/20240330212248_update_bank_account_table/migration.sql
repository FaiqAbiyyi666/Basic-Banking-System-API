/*
  Warnings:

  - You are about to drop the column `bank_acount_number` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `bank_account_number` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "bank_acount_number",
ADD COLUMN     "bank_account_number" TEXT NOT NULL;

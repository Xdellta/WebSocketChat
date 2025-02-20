/*
  Warnings:

  - You are about to drop the column `chat_id` on the `ChatMessages` table. All the data in the column will be lost.
  - You are about to drop the `ChatUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatMessages" DROP CONSTRAINT "ChatMessages_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatUsers" DROP CONSTRAINT "ChatUsers_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatUsers" DROP CONSTRAINT "ChatUsers_user_id_fkey";

-- AlterTable
ALTER TABLE "ChatMessages" DROP COLUMN "chat_id";

-- DropTable
DROP TABLE "ChatUsers";

-- DropTable
DROP TABLE "Chats";

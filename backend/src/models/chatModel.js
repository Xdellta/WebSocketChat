const prisma = require('../../prisma/prismaClient')

async function createChatMessage(chatMessageData) {
  return await prisma.chatMessages.create({
    data: chatMessageData,
  });
}

module.exports = { createChatMessage };
const prisma = require('../../../prisma/prismaClient');
const { v4: uuidv4 } = require('uuid');

async function newMessage(ws, userId, content) {
  if (!userId || !content) return;

  const message = await prisma.chatMessages.create({
    data: {
      message_id: uuidv4(),
      user_id: userId,
      content,
      created_at: new Date(),
    }
  })

  const user = await prisma.users.findFirst({
    where: {
      user_id: userId,
    }
  })

  ws.send(JSON.stringify({
    type: 'newMessage',
    message: {
      messageId: message.message_id,
      userId: user.user_id,
      userName: user.name,
      userAvatar: user.avatar,
      content: message.content,
      createdAt: message.created_at,
    }
  }));
}

module.exports = { newMessage };
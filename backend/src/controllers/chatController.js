const prisma = require('../../prisma/prismaClient');

async function getChatHistory(req, res) {
  try {
    const oldestMessageId = req.query.oldestMessageId;

    let queryOptions = {
      take: 30,
      include: {
        user: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    };

    if (oldestMessageId) {
      const oldestMessage = await prisma.chatMessages.findUnique({
        where: { message_id: oldestMessageId },
        select: { created_at: true },
      });

      if (!oldestMessage) {
        return res.status(404).json({
          success: false,
          message: 'Message not found.',
        });
      }

      queryOptions.where = {
        created_at: { lt: oldestMessage.created_at },
      };
    }

    const messages = await prisma.chatMessages.findMany(queryOptions);

    const formattedMessages = messages.map(msg => ({
      messageId: msg.message_id,
      userId: msg.user_id,
      userName: msg.user?.name || 'Unknown',
      userAvatar: msg.user?.avatar || null,
      content: msg.content,
      createdAt: msg.created_at,
    }));

    res.status(200).json({
      success: true,
      message: 'Chat message history downloaded successfully',
      data: formattedMessages.reverse(),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Internal server error. ${error.message}`,
    });
  }
}

module.exports = { getChatHistory };
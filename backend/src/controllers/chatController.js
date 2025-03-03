const prisma = require('../../prisma/prismaClient');

async function getChatHistory(req, res) {
  try {
    const lastMessage = req.body.lastMessage;

    const queryOptions = {
      take: 30,
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    };

    if (lastMessage) {
      queryOptions.where = { created_at: { lt: new Date(lastMessage) } };
    }

    const messages = await prisma.chatMessages.findMany(queryOptions);

    const formattedMessages = messages.map(msg => ({
      messageId: msg.message_id,
      userId: msg.user_id,
      userName: msg.user?.name || 'Unknown',
      userAvatar: msg.user?.avatar || null,
      content: msg.content,
      createdAt: msg.created_at.toISOString(),
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
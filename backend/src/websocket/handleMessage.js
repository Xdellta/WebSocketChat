const { newMessage } = require('./actions/newMessage');
const prisma = require('../../prisma/prismaClient');

async function handleMessage(ws, message) {
  try {
    const data = JSON.parse(message);

    if (!data.userId || !data.type || !data.content) {
      ws.send(JSON.stringify({ error: 'The message does not contain the required data' }));
      return;
    }

    user = await prisma.users.findUnique({
      where: {
        user_id: data.userId,
      }
    })

    if (!user) {
      ws.send(JSON.stringify({ error: 'User does not exist' }));
      return;
    }

    switch (data.type) {
      case 'newMessage':
        await newMessage(ws, data.userId, data.content);
        break;
      default:
        ws.send(JSON.stringify({ error: 'Unknown message type' }));
        console.log('Unknown message type')
    }

  } catch(error) {
    console.log('Error in handling WebSocket messages:', error);
    ws.send(JSON.stringify({ error: 'Error processing the message' }));
  }
}

module.exports = { handleMessage };
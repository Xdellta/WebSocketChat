const WebSocket = require('ws');
const { addClient, removeClient } = require('./connections.js');
const { handleMessage } = require('./handleMessage.js')

function websocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    addClient(ws);

    ws.on("message", (message) => {
      handleMessage(ws, message);
    });

    ws.on("error", (error) => {
      console.error("Error WebSocket:", error);
    });

    ws.on("close", () => {
      removeClient(ws);
    });
  });
}

module.exports = { websocketServer };
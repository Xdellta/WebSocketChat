const WebSocket = require('ws');
const { addClient, removeClient } = require('./connectWs.js');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    addClient(ws);

    ws.on("message", (message) => {
      message = message.toString();
      console.log("Otrzymano wiadomość:", message);
    });

    ws.on("error", (error) => {
      console.error("Error WebSocket:", error);
    });

    ws.on("close", () => {
      removeClient(ws);
    });
  });
}

module.exports = { setupWebSocket };
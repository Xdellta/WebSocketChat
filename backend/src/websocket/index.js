const WebSocket = require('ws');
const { addClient, removeClient } = require('./connectWs.js');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    addClient(ws);
    console.log("Nowe połączenie WebSocket");

    ws.on("close", () => {
      removeClient(ws);
      console.log("Połączenie WebSocket zamknięte");
    });
  });
}

module.exports = { setupWebSocket };
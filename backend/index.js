require('dotenv').config();

const express = require('express');
const http = require('http');
const { setupWebSocket } = require('./src/websocket/setupWs');

const app = express();
const server = http.createServer(app);
const port= 3000;

app.use(express.json());

setupWebSocket(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
require('dotenv').config();

const express = require('express');
const http = require('http');
const { websocketServer } = require('./src/websocket/webocketServer');

const app = express();
const server = http.createServer(app);
const port= 3000;

app.use(express.json());

websocketServer(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
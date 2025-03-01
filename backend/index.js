require('dotenv').config();

const express = require('express');
const routes = require('./src/routes/index');
const http = require('http');
const { websocketSetup } = require('./src/websocket/index');

const app = express();
const server = http.createServer(app);
const port= 3000;

api.use('/api', routes);
app.use(express.json());

websocketSetup(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
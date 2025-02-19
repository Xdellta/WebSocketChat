require('dotenv').config();

const express = require('express');
const routes = require('./src/routes/routes');
const http = require('http');
const { setupWebSocket } = require('./src/websocket/index');

const app = express();
const server = http.createServer(app);
const port= process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

setupWebSocket(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');
const http = require('http');
const { websocketSetup } = require('./src/websocket/index');

const app = express();
const server = http.createServer(app);
const domain = process.env.BACK_DOMAIN || 'localhost';
const port = process.env.BACK_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

websocketSetup(server);

server.listen(port, () => {
  console.log(`Server is running on http://${domain}:${port}`);
});
const clients = new Set();

function addClient(ws) {
  clients.add(ws);
}

function removeClient(ws) {
  clients.delete(ws);
}

function getClients() {
  return clients;
}

module.exports = { addClient, removeClient, getClients };
const prisma = require('../../prisma/prismaClient')

async function createUser(userData) {
  return await prisma.users.create({
    data: userData,
  });
}

module.exports = { createUser };
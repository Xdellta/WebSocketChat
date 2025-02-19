const prisma = require('../../prisma/prismaClient')

async function createUser(userData) {
  return await prisma.user.create({
    data: userData,
  });
}

module.exports = { createUser };
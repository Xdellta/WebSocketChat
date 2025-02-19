const { PrismaClient } = require('@prisma/client');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public`;

process.env.DATABASE_URL = DATABASE_URL;

const prisma = new PrismaClient();

module.exports = prisma;
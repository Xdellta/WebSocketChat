const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

seedDatabase();

async function seedDatabase() {
  try {
    const users = [];

    for (let i = 0; i < 2; i++) {
      const response = await axios.get('https://randomuser.me/api/');
      const userData = response.data.results[0];

      const hashedPassword = await bcrypt.hash('password123', 10);

      const user = {
        user_id: uuidv4(),
        name: `${userData.name.first} ${userData.name.last}`,
        email: userData.email,
        password: hashedPassword,
        avatar: userData.picture.large,
      };

      users.push(user);
    }

    for (const user of users) {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
        },
      });
    }

  } catch (error) {
    console.error('Error while seeding users:', error);
  } finally {
    console.log('Seeding completed successfully');
    await prisma.$disconnect();
  }
}
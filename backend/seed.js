const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const prisma = require('./prisma/prismaClient.js');
const userModel = require('./src/models/userModel.js');
const chatModel = require('./src/models/chatModel.js');

async function seed() {
  await seedUsers();
  await seedChatMessages(50);
}

async function seedUsers() {
  try {
    await prisma.users.deleteMany();

    const users = [];

    for (let i = 0; i < 2; i++) {
      const response = await axios.get('https://randomuser.me/api/');
      const userData = response.data.results[0];

      const user = {
        user_id: uuidv4(),
        name: `${userData.name.first} ${userData.name.last}`,
        avatar: userData.picture.large,
      };

      users.push(user);
    }

    for (const user of users) {
      userModel.createUser(user);
    }

    console.log('User seeding completed successfully');
    return users;

  } catch (error) {
    console.error('Error while seeding users:', error); 
  }
}

async function seedChatMessages(countMsg = 0) {
  try {
    await prisma.chatMessages.deleteMany();

    const users = await prisma.users.findMany();
    const chatMessages = [];

    for (let i = 0; i < countMsg; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const randomDate = new Date();
      randomDate.setHours(Math.floor(Math.random() * 24));
      randomDate.setMinutes(Math.floor(Math.random() * 60));
      randomDate.setSeconds(Math.floor(Math.random() * 60));
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 7));

      const chatMessage = {
        message_id: uuidv4(),
        user_id: randomUser.user_id,
        content: faker.lorem.sentence(),
        created_at: randomDate,
      };

      chatMessages.push(chatMessage);
    }

    for (const chatMessage of chatMessages) {
      chatModel.createChatMessage(chatMessage);
    }

    console.log('Chat messages seeding completed successfully');

  } catch (error) {
    console.error('Error while seeding chat messages:', error); 
  }
}

seed();
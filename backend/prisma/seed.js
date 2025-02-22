const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const prisma = require('./prismaClient.js');

async function seed() {
  await prisma.chatMessages.deleteMany();
  await prisma.users.deleteMany();
  
  await seedUsers();
  await seedChatMessages(50);
}

async function seedUsers() {
  try {
    for (let i = 0; i < 2; i++) {
      const response = await axios.get('https://randomuser.me/api/');
      const userData = response.data.results[0];

      await prisma.users.create({
        data: {
          user_id: uuidv4(),
          name: `${userData.name.first} ${userData.name.last}`,
          avatar: userData.picture.large,
        },
      })
    }

    console.log('User seeding completed successfully');

  } catch (error) {
    console.error('Error while seeding users:', error); 
  }
}

async function seedChatMessages(countMsg = 0) {
  try {
    const users = await prisma.users.findMany();

    for (let i = 0; i < countMsg; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const randomDate = new Date();
      randomDate.setHours(Math.floor(Math.random() * 24));
      randomDate.setMinutes(Math.floor(Math.random() * 60));
      randomDate.setSeconds(Math.floor(Math.random() * 60));
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 7));

      await prisma.chatMessages.create({
        data: {
          message_id: uuidv4(),
          user_id: randomUser.user_id,
          content: faker.lorem.sentence(),
          created_at: randomDate,
        },
      })
    }

    console.log('Chat messages seeding completed successfully');

  } catch (error) {
    console.error('Error while seeding chat messages:', error); 
  }
}

seed();
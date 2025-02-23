# WebSocket Chat
The "WebSocketChat" project is an educational example designed to demonstrate the implementation and functionality of the WebSocket mechanism using a chat application as a practical case.

<br>

### 🛠️ Tools and Technologies
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgresql](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)

<br>

### 📜 License
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE) By [Patryk Piotrowski](https://github.com/Xdellta)

<br>

## 🎨 Frontend

**1.** Clone the repository:
```sh
git https://github.com/Xdellta/WebSocketChat.git
cd WebSocketChat && cd frontend
```

**2.** Install dependencies:
```sh
npm install
```

**3.** Start the server
```sh
npm run dev
```

<br>

## 💻 Backend

**1.** Install PostgresQL software
```sh
https://www.postgresql.org/download/
```

**2.** Clone the repository:
```sh
git https://github.com/Xdellta/WebSocketChat.git
cd WebSocketChat && cd backend
```

**3.** Install dependencies:
```sh
npm install
```

**4** Configure the environment
Create a .env file in the project root and configure the required environment variables. Below is an example:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/WebSocketChat
```

**5.** Run database migrations and seed data
```sh
npx prisma migrate dev  
npm run seed  
```

**6.** Start the server
```sh
npm run dev
```
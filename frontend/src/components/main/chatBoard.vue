<script setup lang="ts">
  import { ref, inject, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axiosInstance from '@/services/axiosService';

  interface Message {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    createdAt: string;
  }

  const route = useRoute();
  const yourId = route.params.userId;
  const wsService = inject('wsService');
  const messages = ref<Message[]>([]);

  async function getMsgHistory(lastMessage: string | null) {
    try {
      const response = await axiosInstance.get('chat/getChatHistory', {
        params: { lastMessage }
      });
      
      messages.value.push(...response.data.data)

    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  }

  wsService.addListener('newMessage', (message: Message) => {
    messages.value.push(message);
  });

  onMounted(() => {
    getMsgHistory();
  })
</script>

<template>
  <div class="shadow top-shadow"></div>

  <ul class="chat-board">
    <li 
      v-for="message in messages"
      :key="message.userId"
      :class="{'your-message': message.userId === yourId}"
    >
      <img
        class="avatar"
        :src="message.userAvatar"
        :alt="message.userName"
      >

      <span class="name">
        {{ message.userId === yourId ? 'You' : message.userName }}
      </span>

      <p class="content">
        {{ message.content }}
      </p>
    </li>
  </ul>

  <div class="shadow bottom-shadow"></div>
</template>

<style scoped>
  .shadow {
    position: absolute;
    left: 0;
    width: 100%;
  }

  .top-shadow {
    height: 60px;
    background: linear-gradient(var(--color-background), rgba(0, 0, 0, 0));
  }

  .bottom-shadow {
    height: 20px;
    bottom: 75px;
    background: linear-gradient(rgba(0, 0, 0, 0), var(--color-background));
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    flex: 1;
    overflow-y: auto;
    gap: 30px;
    padding: 20px;
  }

  li {
    display: grid;
    grid-template-columns: 36px auto;
    grid-template-rows: auto auto;
    column-gap: 10px;
    row-gap: 8px;
  }

  .your-message {
    grid-template-columns: auto 36px;
    justify-items: right;
    align-self: flex-end;
  }

  .avatar {
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 50%;
    grid-row: span 2;
  }

  .name {
    grid-column: 2;
    grid-row: 1;
    font-weight: 500;
  }

  .content {
    width: fit-content;
    padding: 6px 16px;
    color: var(--color-text-primary);
    background-color: var(--color-element);
    border: 1px solid var(--color-border);
    grid-column: 2;
    border-radius: 8px 20px 20px 20px;
  }

  .your-message .avatar {
    grid-column: 2;
  }

  .your-message .name {
    grid-column: 1;
  }

  .your-message .content {
    grid-column: 1;
    background-color: var(--color-accent);
    color: #FFFFFF;
    border: none;
    border-radius: 20px 8px 20px 20px;
  }
</style>
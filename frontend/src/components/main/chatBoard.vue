<script setup lang="ts">
  import { ref, inject } from 'vue';
  import { useRoute } from 'vue-router';

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

  wsService.addListener('newMessage', (message: Message) => {
    messages.value.push(message);
  });
</script>

<template>
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
</template>

<style scoped>
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    flex: 1;
    overflow-y: auto;
    gap: 30px;
  }

  li {
    display: grid;
    grid-template-columns: 36px auto;
    grid-template-rows: auto auto;
    column-gap: 8px;
    row-gap: 4px;
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
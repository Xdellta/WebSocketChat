<script setup lang="ts">
  import { ref, inject } from 'vue';

  interface Message {
    userId: string;
    type: string;
    content: string
  }

  const wsService = inject('wsService');
  const messages = ref<Message[]>([]);

  wsService.addListener('newMessage', (message: Message) => {
    messages.value.push(message);
  });
</script>

<template>
  <ul class="chat-board">
    <li v-for="message in messages" :key="message.userId">
      {{ message.content }}
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
  }
</style>
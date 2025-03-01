<script setup lang="ts">
  import { ref, inject } from 'vue';

  interface Message {
    userId: string;
    type: string;
    content: string
  }

  const wsService = inject('wsService');
  const messages = ref<Message[]>([]);
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
    height: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
  }
</style>
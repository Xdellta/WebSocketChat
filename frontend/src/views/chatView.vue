<script setup lang="ts">
  import { onMounted, onUnmounted, provide } from 'vue';
  import chatBoard from '@/components/main/chatBoard.vue';
  import inputMessage from '@/components/main/inputMsg.vue';
  import WebSocketService from '@/services/webSocketService';

  const wsService = new WebSocketService();

  onMounted(() => {
    wsService.connect();
  })

  onUnmounted(() => {
    wsService.close();
  })

  provide('wsService', wsService);
</script>

<template>
  <header></header>

  <main>
    <chatBoard />
    <inputMessage />
  </main>
</template>

<style scoped>
  header {
    width: 100%;
    height: 80px;
    display: flex;
  }

  main {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 20px;
  }
</style>
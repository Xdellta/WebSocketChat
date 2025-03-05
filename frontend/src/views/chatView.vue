<script setup lang="ts">
  import { onMounted, onUnmounted, provide } from 'vue';
  import chatBoard from '@/components/main/chatBoard.vue';
  import inputMessage from '@/components/main/inputMsg.vue';
  import WebSocketService from '@/services/webSocketService';
  import ArrowIcon from '@/assets/icons/ArrowIcon.vue';

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
  <header>
    <RouterLink to="/">
      <ArrowIcon class="icon-arrow" />
    </RouterLink>
  </header>

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
    align-items: center;
    padding: 0 20px;
  }

  .icon-arrow {
    width: max-content;
    height: 38px;
    fill: var(--color-text);
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .icon-arrow:hover {
    fill: var(--color-accent);
    scale: 1.1;
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
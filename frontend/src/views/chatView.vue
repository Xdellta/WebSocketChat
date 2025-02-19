<script setup lang="ts">
  import { ref } from 'vue';
  import chatBoard from '@/components/main/chatBoard.vue';
  import inputMessage from '@/components/main/inputMsg.vue';

  const inputMsg = ref();
</script>

<template>
  <header></header>

  <main>
    <chatBoard />
    <inputMessage v-model="inputMsg" />
  </main>
</template>

<style scoped>
  header {
    width: 100%;
    height: 60px;
    display: flex;
    border-bottom: 1px solid var(--color-border);
  }

  main {
    width: 100%;
    height: calc(100% - 60px);
    padding: 20px;
    gap: 20px;
    display: flex;
    flex-direction: column;
  }
</style>
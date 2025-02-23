<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const messages = ref([]);
</script>

<template>
  <ul class="chat-board">
    <li>{{ messages }}</li>
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
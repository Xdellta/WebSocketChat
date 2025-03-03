<script setup lang="ts">
  import { ref, onMounted, inject } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const userId = route.params.userId as string;
  const inputText = ref('');
  const wsService = inject('wsService')

  function sendMessage() {
    if(!inputText.value) return;

    wsService.sendMessage({
      userId,
      type: 'newMessage',
      content: inputText.value,
    });

    inputText.value = '';
  }

  onMounted(() => {
    wsService.connect();
  })
</script>

<template>
  <div class="input-wrapper">
    <input
      type="text"
      placeholder="Your message..."
      v-model="inputText"
      @keydown.enter="sendMessage"
    >
  </div>
</template>

<style scoped>
  .input-wrapper {
    width: 100%;
    height: 45px;
    padding: 0 20px;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0 15px;
    outline: none;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-element);
  }

  input::placeholder {
    color: var(--color-text-secondary);
  }

  input:focus {
    border: 1px solid var(--color-accent);
  }
</style>
<script setup lang="ts">
  import { ref, defineModel } from 'vue';

  const inputMsg = defineModel('inputMsg')
</script>

<template>
  <div class="input-wrapper">
    <input
      type="text"
      placeholder="Your message..."
      v-model="inputMsg"
    >
  </div>
</template>

<style scoped>
  .input-wrapper {
    width: 100%;
    height: 45px;
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
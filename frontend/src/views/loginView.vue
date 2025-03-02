<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import axiosInstance from '@/services/axiosService';

  const router = useRouter();

  async function getUser(userNumber: number) {
    try {
      if (!userNumber) {
        console.error('User number must be 1 or 2.');
        return;
      }

      const result = await axiosInstance.post('/auth/login', { userNumber });

      if (!result) {
        console.error(`Error while retrieving user from server.`);
        return;
      }

      if (result.data.success == true) {
        router.push(`/chat/${result.data.userId}`);
      }

    } catch(error) {
      console.error(`Error while downloading user: ${error}`)
    }
  }
</script>

<template>
  <div class="login-wrapper">
    <button id="btn-1" @click="getUser(1)">User #1</button>
    <button id="btn-2" @click="getUser(2)">User #2</button>
  </div>
</template>

<style scoped>
  .login-wrapper {
    display: flex;
    gap: 30px;
  }

  button {
    height: 60px;
    width: 180px;
    border-radius: 8px;
    outline: none;
    font-size: 120%;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  #btn-1 {
    background-color: var(--color-accent);
    color: var(--color-background);
    font-weight: 800;
    border: none;
  }

  #btn-2 {
    background-color: var(--color-element);
    border: 1px solid var(--color-border);
    font-weight: 200;
  }

  button:hover {
    scale: 1.05;
    letter-spacing: 1px;
  }
</style>
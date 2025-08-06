<!-- src/components/Auth/LoginForm.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { login } = useAuth();

const form = ref({
  username: '',
  password: '',
});

const error = ref('');

const handleLogin = () => {
  if (login(form.value.username, form.value.password)) {
    router.push({ name: 'home' });
  } else {
    error.value = 'نام کاربری یا رمز عبور اشتباه است';
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin" class="space-y-6">
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700">نام کاربری</label>
      <input
        v-model="form.username"
        type="text"
        id="username"
        required
        class="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">رمز عبور</label>
      <input
        v-model="form.password"
        type="password"
        id="password"
        required
        class="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
      />
    </div>

    <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      ورود
    </button>
  </form>
</template>

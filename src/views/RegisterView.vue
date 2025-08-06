<!-- src/views/RegisterView.vue -->
<script setup lang="ts">
import RegisterForm from '../components/Auth/RegisterForm.vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { isAuthenticated } = useAuth();

if (isAuthenticated()) {
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">ثبت‌نام</h2>
      </div>
      <RegisterForm />
      <div class="text-center">
        <router-link
          to="/login"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          قبلا ثبت‌نام کرده‌اید؟ وارد شوید
        </router-link>
      </div>
    </div>
  </div>
</template>

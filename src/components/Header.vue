<script setup lang="ts">
import { useAuth } from '@/composables/useAuth.ts'
import { useRouter } from 'vue-router'

const {  logout } = useAuth();
const router = useRouter();
const handleLogout = () => {
  logout();
  router.push({ name: 'login' });
};
</script>

<template>
<div class="flex justify-between items-center py-6 px-4">
  <button
    @click="handleLogout"
    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
  >
    خروج
  </button>
  <router-link class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
               to="/">خانه / لیست </router-link>
  <router-link class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
               :to="{ name: 'objectCreateForm' }">
    ایجاد محصول
  </router-link>
  <router-link class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
               :to="{ name: 'login' }">لاگین</router-link>
  <router-link class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
               :to="{ name: 'register' }">ثبتنام</router-link>

</div>
</template>

<style scoped>

</style>

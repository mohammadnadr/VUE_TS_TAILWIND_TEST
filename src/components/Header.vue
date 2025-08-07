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
    class="btn-primary"
  >
    خروج
  </button>
  <router-link class="btn-primary"
               to="/">خانه / لیست </router-link>
  <router-link class="btn-primary"
               :to="{ name: 'objectCreateForm' }">
    ایجاد محصول
  </router-link>
  <router-link class="btn-primary"
               :to="{ name: 'login' }">لاگین</router-link>
  <router-link class="btn-primary"
               :to="{ name: 'register' }">ثبتنام</router-link>

</div>
</template>

<style scoped>

</style>

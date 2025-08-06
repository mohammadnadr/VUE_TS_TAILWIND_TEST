<!-- src/views/HomeView.vue -->
<script setup lang="ts">
import { useAuth } from '../composables/useAuth';
import ProductsTable from '@/components/Product/ProductsTable.vue'

const { currentUser } = useAuth();

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <h1 class="text-3xl font-bold text-gray-900">صفحه اصلی</h1>
      </div>
      <div class="bg-white shadow rounded-lg p-6">
        <p class="text-lg text-amber-500">خوش آمدید، {{ currentUser }}!</p>
      </div>
    </div>
    <ProductsTable/>
  </div>
</template>

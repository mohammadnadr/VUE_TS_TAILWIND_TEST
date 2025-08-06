<template>
  <div class="p-4 max-w-2xl mx-auto bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">جزئیات محصول</h1>

    <div v-if="loading" class="text-center">در حال بارگذاری...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else class="bg-white p-6 rounded shadow-md text-black">
      <h2 class="text-xl font-semibold mb-4">{{ product?.name }}</h2>

      <!-- حلقه روی کلیدهای داده -->
      <div v-for="([key, value], index) in dataEntries" :key="value+'-key'" class="mb-2">
        <span class="font-semibold capitalize">{{ key }}:</span> {{ value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  data: Record<string, any>;
}

const route = useRoute();

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const dataEntries = computed(() => {
  return product.value ? Object.entries(product.value.data) : [];
});

async function getInit() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await axios.get<Product>('https://api.restful-api.dev/objects/' + route.params.id);
    product.value = data;
  } catch (e) {
    console.error(e);
    error.value = 'خطا در دریافت داده‌ها';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getInit();
});
</script>

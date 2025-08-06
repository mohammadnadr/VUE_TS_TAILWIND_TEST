<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">لیست محصولات</h1>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
<!--      <table class="min-w-full divide-y divide-gray-200">-->
<!--        <thead class="bg-gray-50">-->
<!--        <tr>-->
<!--          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>-->
<!--          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام محصول</th>-->
<!--          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">جزئیات</th>-->
<!--          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody class="bg-white divide-y divide-gray-200">-->
      <div class="grid grid-cols-4 gap-4">
        <ObjectListItem  v-for="product in products" :key="product.id" :product="product" />
      </div>


<!--        </tbody>-->
<!--      </table>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'
import ObjectListItem from '@/components/Product/ObjectListItem.vue'

const router = useRouter()

interface ProductData {
  [key: string]: any;
}

interface Product {
  id: string;
  name: string;
  data: ProductData | null;
}

const products = ref<Product[]>([]);

async function getInitData() {
  try {
    const { data } = await axios.get('https://api.restful-api.dev/objects');
    products.value = data;
  } catch (e) {
    console.error('خطا در دریافت داده‌ها:', e);
  }
}

onMounted(async () => {
  await getInitData();
});
</script>

<style scoped>
</style>

<template>
  <div class="card mx-2 my-2 border">
    <div class="px-6 py-4  text-sm text-gray-500">{{ product.id }}</div>
    <div class="px-6 py-4  text-sm font-medium text-gray-900">{{ product.name }}</div>
    <div class="px-6 py-4  text-sm text-gray-500">
      <div v-if="product.data">
        <div v-for="(value, key) in product.data" :key="key" class="mb-1">
          <span class="font-semibold">{{ key }}:</span> {{ value }}
        </div>
      </div>
      <span v-else class="text-gray-400">بدون جزئیات</span>
    </div>
    <div class="px-6 py-4 flex text-sm font-medium gap-1">
      <button
        @click="detailProduct(product.id)"
        class="border px-2 py-1 text-indigo-600 hover:text-indigo-900"
      >
        جزییات
      </button>
      <button
        @click="editProduct(product.id)"
        class="border px-2 py-1 text-indigo-600 hover:text-indigo-900"
      >
        ویرایش
      </button>
      <button
        @click="confirmDelete(product.id)"
        class="border px-2 py-1 text-red-600 hover:text-red-900"
      >
        حذف
      </button>
    </div>
  </div>
  <div
    v-if="showConfirm"
    class="fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full">
      <h2 class="text-xl text-black font-semibold mb-4">آیا مطمئنید؟</h2>
      <div class="flex justify-end space-x-4">
        <button
          @click="cancelDelete"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
        >
          انصراف
        </button>
        <button
          @click="deleteProduct"
          class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          حذف کردن
        </button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'
const router = useRouter()
interface Product {
  id: string;
  name: string;
  data?: Record<string, string>;
}

const props = defineProps<{
  product: Product;
}>();

function editProduct(id: string) {
  console.log(router)
  router.push({ name: 'objectEditForm', params: { id: id } })
  console.log('ویرایش محصول با ID:', id);
}
function detailProduct(id: string) {
  // console.log(router)
  router.push({ name: 'objectDetail', params: { id: id } })
  // console.log('ویرایش محصول با ID:', id);
}
const products = ref<Product[]>([]);

async function deleteProduct() {
  try {
    const data = await axios.delete(`https://api.restful-api.dev/objects/${removedId.value}`);
    products.value = products.value.filter(product => product.id !== removedId.value);
    console.log(data)
    alert('محصول با موفقیت حذف شد');
  } catch (e) {
    console.error('خطا در حذف محصول:', e);
    alert('خطا در حذف محصول:' + e);
  }
}
const showConfirm = ref(false)
const removedId = ref('')
function confirmDelete(id: string) {
  removedId.value = id
  showConfirm.value = true;
}
function cancelDelete() {
  showConfirm.value = false;
}
</script>

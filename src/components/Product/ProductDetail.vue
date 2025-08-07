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
      <button
        @click="editProduct(product.id)"
        class="btn-secondary"
      >
        ویرایش
      </button>
      <button
        @click="confirmDelete(product.id)"
        class="btn-error"
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  data: Record<string, any>;
}
const router = useRouter()

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
function editProduct(id: string) {
  console.log(router)
  router.push({ name: 'objectEditForm', params: { id: id } })
  console.log('ویرایش محصول با ID:', id);
}

async function deleteProduct() {
  try {
    const data = await axios.delete(`https://api.restful-api.dev/objects/${route.params.id}`);
    // products.value = products.value.filter(product => product.id !== removedId.value);
    console.log(data)
    alert('محصول با موفقیت حذف شد');
    router.push({ name: 'home' });
  } catch (e) {
    console.error('خطا در حذف محصول:', e);
    alert('خطا در حذف محصول:' + e);
  }
}
const showConfirm = ref(false)
// const removedId = ref('')
function confirmDelete() {
  // removedId.value = id
  showConfirm.value = true;
}
function cancelDelete() {
  showConfirm.value = false;
}
onMounted(() => {
  getInit();
});
</script>

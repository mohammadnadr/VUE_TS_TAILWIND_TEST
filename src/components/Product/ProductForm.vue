<template>
  <div class="bg-gray-100">
    <h2>{{ isEdit ? 'ویرایش محصول' : 'ساخت محصول جدید' }}</h2>
    <form @submit.prevent="handleSubmit" class="bg-gray-100">
      <div>
        <label class="block text-sm font-medium text-gray-700" for="name">نام محصول:</label>
        <input
          class="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          :class="{ 'border-red-500': name.length > 0 && name.length < 4 }"
          id="name"
          v-model="name"
          required
        />
        <div v-if="name.length > 0 && name.length < 4" class="text-red-600 text-sm mt-1">
          نام باید حداقل 4 کاراکتر باشد.
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700" for="color">رنگ:</label>
        <input
          class="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          id="color" v-model="color" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700" for="capacity">ظرفیت:</label>
        <input
          type="number"
          class="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          id="capacity" v-model="capacity" required />
      </div>
      <button
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit">{{ isEdit ? 'ویرایش' : 'ایجاد' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const id = route.params.id as string | undefined;

const name = ref('');
const color = ref('');
const capacity = ref('');
const isEdit = computed(() => !!id);

const fetchProduct = async () => {
  try {
    const response = await axios.get(`https://api.restful-api.dev/objects/${id}`);
    const data = response.data;
    name.value = data.name || '';
    color.value = data.data?.color || '';
    capacity.value = data.data?.capacity || '';
  } catch (error) {
    console.error('خطا در دریافت اطلاعات:', error);
    alert('خطا در بارگذاری اطلاعات محصول');
  }
};

const handleSubmit = async () => {
  if (name.value.length < 4) {
    alert('نام باید حداقل 4 کاراکتر باشد.');
    return;
  }
  const payload = {
    name: name.value,
    data: {
      color: color.value,
      capacity: capacity.value,
    },
  };

  try {
    if (isEdit.value && id) {
      // ویرایش محصول
      const response = await axios.put(`https://api.restful-api.dev/objects/${id}`, payload);
      alert('محصول با موفقیت ویرایش شد');
      router.push({ name: 'objectDetail', params: { id: response.data.id } });
    } else {
      // ساخت محصول جدید
      const response = await axios.post(`https://api.restful-api.dev/objects`, payload); // در صورت نیاز، عدد را تغییر دهید.

      alert('محصول جدید ساخته شد');
      router.push({ name: 'objectDetail', params: { id: response.data.id } });
    }
  } catch (error) {
    console.error('خطا در ارسال اطلاعات:', error);
    alert('خطا در ارسال اطلاعات');
  }
};

onMounted(() => {
  if (isEdit.value && id) {
    fetchProduct();
  }
});
</script>

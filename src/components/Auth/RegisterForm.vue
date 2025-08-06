<!-- src/components/Auth/RegisterForm.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuth } from '../../composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { register } = useAuth();

const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
});

const error = ref('');

// اعتبارسنجی رمز عبور
const isPasswordValid = computed(() => {
  const password = form.value.password;
  return password.length >= 3 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
});
// اعتبارسنجی نام کاربری
const isUsernameValid = computed(() => {
  const v = form.value.username;
  return v.length >= 4 && /[a-zA-Z]/.test(v) && /[0-9]/.test(v);
});

// اعتبارسنجی تطابق رمز عبور و تکرار آن
const isPasswordMatch = computed(() => {
  return form.value.password === form.value.confirmPassword;
});

const handleRegister = () => {
  if (!isPasswordValid.value) {
    error.value = 'رمز عبور باید حداقل ۳ کاراکتر و شامل حروف و اعداد باشد';
    return;
  }

  if (!isPasswordMatch.value) {
    error.value = 'رمزهای عبور مطابقت ندارند';
    return;
  }

  if (register(form.value.username, form.value.password)) {
    router.push({ name: 'login' });
  } else {
    error.value = 'نام کاربری قبلا استفاده شده است';
  }
};
</script>

<template>
  <form @submit.prevent="handleRegister" class="space-y-6">
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700">نام کاربری</label>
      <input
        v-model="form.username"
        type="text"
        id="username"
        required
        :class="[
          'mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border',
          form.username && !isUsernameValid ? 'border-red-500' : ''
        ]"
      />
      <p v-if="form.username && !isUsernameValid" class="mt-1 text-sm text-red-600">
        نام کاربری باید حداقل 4 کاراکتر و شامل حروف و اعداد باشد
      </p>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">رمز عبور</label>
      <input
        v-model="form.password"
        type="password"
        id="password"
        required
        :class="[
          'mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border',
          form.password && !isPasswordValid ? 'border-red-500' : ''
        ]"
      />
      <p v-if="form.password && !isPasswordValid" class="mt-1 text-sm text-red-600">
        رمز عبور باید حداقل ۳ کاراکتر و شامل حروف و اعداد باشد
      </p>
    </div>

    <div>
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">تکرار رمز عبور</label>
      <input
        v-model="form.confirmPassword"
        type="password"
        id="confirmPassword"
        required
        :class="[
          'mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border',
          form.confirmPassword && !isPasswordMatch ? 'border-red-500' : ''
        ]"
      />
      <p v-if="form.confirmPassword && !isPasswordMatch" class="mt-1 text-sm text-red-600">
        رمزهای عبور مطابقت ندارند
      </p>
    </div>

    <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      ثبت‌نام
    </button>
  </form>
</template>

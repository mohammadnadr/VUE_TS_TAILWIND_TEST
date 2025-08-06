// src/composables/useAuth.ts
import { ref } from 'vue';

interface User {
  username: string;
  password: string;
}

export const useAuth = () => {
  const currentUser = ref<string | null>(localStorage.getItem('currentUser') || null);
  const users = ref<User[]>(JSON.parse(localStorage.getItem('users') || '[]'));

  const register = (username: string, password: string): boolean => {
    // بررسی وجود کاربر
    const userExists = users.value.some(user => user.username === username);
    if (userExists) {
      return false;
    }

    // افزودن کاربر جدید
    users.value.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users.value));
    return true;
  };

  const login = (username: string, password: string): boolean => {
    const user = users.value.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      currentUser.value = username;
      localStorage.setItem('currentUser', username);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    currentUser.value = null;
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = (): boolean => {
    return currentUser.value !== null;
  };

  return {
    currentUser,
    register,
    login,
    logout,
    isAuthenticated,
  };
};

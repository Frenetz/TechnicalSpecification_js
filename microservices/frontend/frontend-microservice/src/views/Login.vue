<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Авторизация</div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Имя пользователя</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary">Войти</button>
              <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const error = ref(null);

const handleLogin = async () => {
  try {
    error.value = null;
    
    await authStore.login({
      username: username.value,
      password: password.value
    });

  } catch (err) {
    error.value = 'Неверные учетные данные или ошибка сервера.';
    console.error('Login failed:', err);
  }
};
</script>
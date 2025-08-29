<template>
  <div class="container mt-4">
    <h1>{{ title }}</h1>
    <div v-if="loading" class="text-center">Загрузка...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else class="row">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <div class="card">
          <img :src="product.images[0]?.url" class="card-img-top" alt="Product Image" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">Цена: {{ product.price }}</p>
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="btn btn-primary">Подробнее</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  apiUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const response = await axios.get(props.apiUrl, {
      headers: {
        'Authorization': `Bearer ${authStore.accessToken}`
      }
    });
    products.value = response.data.data;
  } catch (err) {
    console.error('Ошибка при загрузке товаров:', err);
    error.value = 'Не удалось загрузить товары.';
  } finally {
    loading.value = false;
  }
});
</script>
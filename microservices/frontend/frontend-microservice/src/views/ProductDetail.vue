<template>
    <div class="container mt-4" v-if="product">
        <div class="row">
            <div class="col-md-6">
                <img :src="product.images[0]?.url" class="img-fluid" alt="Product Image">
            </div>
            <div class="col-md-6">
                <h1>{{ product.name }}</h1>
                <p>{{ product.description }}</p>
                <p><strong>Цена:</strong> {{ product.price }}</p>
                <p><strong>Скидка:</strong> {{ product.discount }}%</p>
                <h3>Атрибуты:</h3>
                <ul>
                    <li v-for="attribute in product.attributes" :key="attribute.id">
                        <strong>{{ attribute.key }}:</strong> {{ attribute.value }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-else-if="loading" class="text-center mt-5">Загрузка...</div>
    <div v-else-if="error" class="alert alert-danger mt-5">{{ error }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const product = ref(null);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const authStore = useAuthStore();

onMounted(async () => {
    const productId = route.params.id;
    try {
        const response = await axios.get(`http://localhost:8000/api/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${authStore.accessToken}`
            }
        });
        product.value = response.data.data;
    } catch (err) {
        console.error('Ошибка при загрузке деталей товара:', err);
        error.value = 'Не удалось загрузить информацию о товаре.';
    } finally {
        loading.value = false;
    }
});
</script>
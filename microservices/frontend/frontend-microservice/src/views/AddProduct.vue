<template>
    <div class="container mt-4">
        <h1>Добавить товары</h1>
        <form @submit.prevent="uploadFile">
            <div class="mb-3">
                <label for="excelFile" class="form-label">Выберите Excel файл</label>
                <input type="file" class="form-control" id="excelFile" @change="handleFileUpload" accept=".xlsx, .xls">
            </div>
            <button type="submit" class="btn btn-primary" :disabled="!selectedFile">Загрузить</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const selectedFile = ref(null);
const authStore = useAuthStore();
const router = useRouter();

const handleFileUpload = (event) => {
    selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
    if (!selectedFile.value) return;

    const formData = new FormData();
    formData.append('excel_file', selectedFile.value);

    try {
        await axios.post('http://localhost:8000/api/products/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${authStore.accessToken}`
            }
        });
        alert('Файл успешно загружен!');
        router.push('/my-products');
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        alert('Произошла ошибка при загрузке файла.');
    }
};
</script>
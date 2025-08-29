<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" v-if="authStore.isAuthenticated">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="me-auto">
          <router-link to="/products" class="nav-link me-3">Все товары</router-link>
          <router-link to="/my-products" class="nav-link me-3">Мои товары</router-link>
          <router-link to="/add-product" class="nav-link me-3">Добавить товары</router-link>
        </b-navbar-nav>

        <b-navbar-nav class="ms-auto">
          <a class="nav-link" style="cursor: pointer;" @click="authStore.logout">Выход</a>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <main class="container mt-4">
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

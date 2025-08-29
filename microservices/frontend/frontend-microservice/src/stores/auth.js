import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    setTokens(tokens) {
      this.accessToken = tokens.access_token;
      this.refreshToken = tokens.refresh_token;
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`;
    },

    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete axios.defaults.headers.common['Authorization'];
      router.push('/login');
    },

    async login(authData) {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', authData);
        this.setTokens(response.data);
        await router.push('/products');
      } catch (error) {
        console.error("Ошибка авторизации!", error);
        throw error;
      }
    }
  }
})
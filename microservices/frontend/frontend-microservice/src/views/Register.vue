<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Регистрация</div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="username">Имя пользователя</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
              </div>
              <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Зарегистрироваться</button>
              <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    register() {
      axios.post('http://localhost:8000/api/auth/register', {
        username: this.username,
        password: this.password
      })
      .then(() => {
        this.$router.push('/login');
      })
      .catch(error => {
        this.error = error.response.data.message || 'Произошла ошибка регистрации.';
      });
    }
  }
};
</script>
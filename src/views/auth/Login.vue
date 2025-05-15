<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="logo-container">
        <div class="logo-placeholder">
          <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        </div>
      </div>
      <h2 class="title">Iniciar Sesión</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
              type="email"
              v-model="email"
              placeholder="Email"
              class="form-input"
          />
        </div>

        <div class="form-group">
          <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="form-input"
          />
        </div>

        <button type="submit" class="btn-primary">
          Ingresar
        </button>
      </form>

      <div class="create-account">
        <router-link to="/register" class="link">Crear Cuenta</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // Solo navegación, sin lógica de backend
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo-container {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.logo-placeholder {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.create-account {
  margin-top: 1rem;
}

.link {
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
}

.link:hover {
  text-decoration: underline;
}
</style>
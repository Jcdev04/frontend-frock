<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-container">
        <img src="@/assets/logo-chapaturuta.png" alt="Logo" class="logo" />
      </div>
      <h1>Iniciar Sesión</h1>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Ingrese su correo electrónico"
              required
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Ingrese su contraseña"
              required
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          {{ isLoading ? 'Procesando...' : 'Ingresar' }}
        </button>
      </form>

      <div class="register-link">
        ¿No tienes una cuenta?
        <router-link :to="APP_ROUTES.AUTH.REGISTER">
          Crear Cuenta
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { APP_ROUTES } from '@/shared/services/routes.js';

export default {
  name: 'LoginView',
  computed: {
    APP_ROUTES() {
      return APP_ROUTES;
    }
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
      isLoading: false
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.error = null;

      try {
        // Simula delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simula éxito si hay email y password
        if (this.email && this.password) {
          this.$emit('login-success');
          this.$router.push();
        } else {
          this.error = 'Correo o contraseña incorrectos';
        }
      } catch (err) {
        console.error(err);
        this.error = 'Ocurrió un error al intentar iniciar sesión';
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  width: 400px;
  max-width: 90%;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

h1 {
  margin-bottom: 1.5rem;
  font-weight: 400;
  color: #444;text-align: center}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-login:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error-message {
  color: #e53935;
  margin-bottom: 16px;
  font-size: 14px;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}

.register-link a {
  color: #6b63ff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>

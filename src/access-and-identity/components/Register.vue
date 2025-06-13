<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- Icono -->
      <div class="icon-wrapper">
        <img src="@/assets/logo-chapaturuta.png" alt="Logo" class="icon" />
      </div>
      <h1>Regístrate</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input
              type="text"
              v-model="firstName"
              placeholder="Nombres"
              required
          />
        </div>

        <div class="form-group">
          <input
              type="text"
              v-model="lastName"
              placeholder="Apellidos"
              required
          />
        </div>

        <div class="form-group">
          <input
              type="email"
              v-model="email"
              placeholder="Email"
              required
          />
        </div>

        <div class="form-group">
          <input
              type="password"
              v-model="password"
              placeholder="Password"
              required
          />
        </div>

        <div class="form-group">
          <select v-model="role" required>
            <option disabled value="">Registrarse como</option>
            <option value="conductor">Conductor</option>
            <option value="gestor">Gestor de empresa de transporte</option>
          </select>
        </div>

        <button type="submit" class="btn-submit" :disabled="isLoading">
          {{ isLoading ? 'Procesando...' : 'Ingresar' }}
        </button>

        <div v-if="message" class="message">
          {{ message }}
        </div>
      </form>

      <div class="switch-link">
        ¿Ya tienes una cuenta?
        <router-link :to="APP_ROUTES.AUTH.LOGIN">Inicia Sesión</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { APP_ROUTES } from '@/shared/services/routes.js';

export default {
  name: 'RegisterView',
  computed: {
    APP_ROUTES() {
      return APP_ROUTES;
    }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      isLoading: false,
      message: null
    };
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      this.message = null;
      try {
        // Simula petición al servidor
        await new Promise(r => setTimeout(r, 1000));
        // Simula éxito
        this.message = 'Registro exitoso 🎉';
        // Opcional: redirige después de un momento
        setTimeout(() => {
          this.$router.push(APP_ROUTES.AUTH.LOGIN);
        }, 800);
      } catch {
        this.message = 'Ocurrió un error, intenta de nuevo.';
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}
.auth-card {
  background: #fff;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  width: 360px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
}
.icon-wrapper {
  margin-bottom: 1rem;
}
.icon {
  width: 64px;
  height: 64px;
}
h1 {
  margin-bottom: 1.5rem;
  font-weight: 400;
  color: #444;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem 0.5rem;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  outline: none;
}
.form-group select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.btn-submit {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
}
.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.message {
  margin-top: 1rem;
  color: #28a745;
  font-size: 14px;
}
.switch-link {
  margin-top: 1.25rem;
  font-size: 14px;
  color: #555;
}
.switch-link a {
  color: #6b63ff;
  text-decoration: none;
  margin-left: 4px;
}
.switch-link a:hover {
  text-decoration: underline;
}
</style>

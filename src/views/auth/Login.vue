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
        ¿No tienes una cuenta? <router-link to="/register">Crear Cuenta</router-link>
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
      password: '',
      error: null,
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.error = null;

      try {
        // Aquí iría la lógica real de autenticación con tu backend
        // Por ahora, simulamos un login exitoso

        // Simulación de una llamada a API (reemplazar con tu lógica real)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verificar credenciales (esto es solo un ejemplo)
        if (this.email && this.password) {
          // Guardar token en localStorage (simulado)
          localStorage.setItem('auth_token', 'ejemplo_token_jwt');

          // Emitir evento de login exitoso
          this.$emit('login-success');

          // Redireccionar a la página principal donde se muestra el toolbar
          this.$router.push('/rutas');
        } else {
          this.error = 'Correo o contraseña incorrectos';
        }
      } catch (error) {
        console.error('Error durante el login:', error);
        this.error = 'Ocurrió un error al intentar iniciar sesión';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  text-align: center;
  margin-bottom: 24px;
  color: #333;
  font-size: 24px;
}

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
  color: var(--color-primary);
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
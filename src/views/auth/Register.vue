<template>
  <div class="register-container">
    <div class="register-card">
      <div class="logo-container">
        <img src="@/assets/logo-chapaturuta.png" alt="Logo" class="logo" />
      </div>
      <h1>Crear Cuenta</h1>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Nombre completo</label>
          <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Ingrese su nombre completo"
              required
          />
        </div>

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

        <div class="form-group">
          <label for="confirmPassword">Confirmar contraseña</label>
          <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="Confirme su contraseña"
              required
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="btn-register" :disabled="isLoading">
          {{ isLoading ? 'Procesando...' : 'Registrarse' }}
        </button>
      </form>

      <div class="login-link">
        ¿Ya tienes una cuenta? <router-link to="/login">Iniciar Sesión</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      isLoading: false
    }
  },
  methods: {
    async handleRegister() {
      this.isLoading = true;
      this.error = null;

      try {
        // Validar que las contraseñas coincidan
        if (this.password !== this.confirmPassword) {
          this.error = 'Las contraseñas no coinciden';
          return;
        }

        // Aquí iría la lógica real de registro con tu backend
        // Por ahora, simulamos un registro exitoso

        // Simulación de una llamada a API (reemplazar con tu lógica real)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verificar datos (esto es solo un ejemplo)
        if (this.name && this.email && this.password) {
          // Guardar información del usuario (simulado)
          const userInfo = {
            name: this.name,
            email: this.email
          };

          localStorage.setItem('user_info', JSON.stringify(userInfo));

          // Nota: No establecemos el token de autenticación aquí,
          // ya que primero debe completar el registro de la empresa

          // Redireccionar a la página de registro de empresa
          this.$router.push('/register-company');
        } else {
          this.error = 'Por favor complete todos los campos';
        }
      } catch (error) {
        console.error('Error durante el registro:', error);
        this.error = 'Ocurrió un error al intentar registrarse';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-card {
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
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
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

.btn-register {
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

.btn-register:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error-message {
  color: #e53935;
  margin-bottom: 16px;
  font-size: 14px;
}

.login-link {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #555;
}

.login-link a {
  color: var(--color-primary);
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
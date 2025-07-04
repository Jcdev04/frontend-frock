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
import { AuthService } from '@/access-and-identity/services/auth.service.js';
import { TransportCompanyService} from "@/transport-company/services/transport-company.service.js";

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
        const credentials = {
          email: this.email,
          password: this.password
        };

        // Llamar al servicio de autenticación
        const authService = new AuthService();
        const response = await authService.login(credentials);

        // Guardar el token y datos del usuario en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.id,
          username: response.username,
          role: response.role
        }));

        // Redireccionar según el rol (ejemplo)
        if (response.role === 0) {
          this.$router.push('/'); //redirecciona al usuario tipo viajero a la página de inicio
        }

        //aqui tenemos que verificar si el usuario tipo conductor es nuevo o no
        //usaremos la funcion de getCompanyByFkUserId, si no existe una compañia asociada,
        //con esto sabremos que es un usuario nuevo y lo redireccionamos a la pagina de onboarding
        //si no es neuvo, lo redireccionamos a la pagina de inicio /company/home
        if (response.role === 1) {
          try {
            // Verificar si el conductor ya tiene una compañía asociada
            const transportCompanyService = new TransportCompanyService();
            const companyData = await transportCompanyService.getCompanyByFkUserId(response.id);

            localStorage.setItem('user', JSON.stringify({
              id: response.id,
              username: response.username,
              role: response.role,
              companyId: companyData.id
            }));

            console.log('Datos de usuario guardados:', JSON.parse(localStorage.getItem('user')));

            // Si llega aquí es porque existe una compañía asociada
            this.$router.push('/company/home');

          } catch (error) {
            // Si hay error (404) significa que no existe compañía, es un usuario nuevo
            console.log('Usuario conductor nuevo, redirigiendo a onboarding');
            this.$router.push('/company/onboarding');
          }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error('Error en login:', error);
        this.errorMessage = 'Credenciales incorrectas. Intente nuevamente.';
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

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Forzar la eliminación del token de autenticación al iniciar la aplicación
// Esto asegura que siempre comience en la página de login
localStorage.removeItem('auth_token');

const app = createApp(App)
app.use(router)
app.mount('#app')
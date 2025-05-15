<template>
  <div id="app">
    <!-- El toolbar solo se muestra si el usuario está autenticado y no estamos en una página de auth -->
    <app-toolbar v-if="isAuthenticated && !isAuthPage" />

    <!-- Router view para mostrar el contenido de cada ruta -->
    <router-view />
  </div>
</template>

<script>
import AppToolbar from './components/AppToolbar.vue'

export default {
  name: 'App',
  components: {
    AppToolbar
  },
  data() {
    return {
      // Por ahora lo dejamos como true para desarrollo
      // En producción, esto vendría de un store o servicio de autenticación
      isAuthenticated: true
    }
  },
  computed: {
    // Comprueba si estamos en una página de autenticación
    isAuthPage() {
      const authRoutes = ['/login', '/register', '/register-company'];
      return authRoutes.includes(this.$route.path);
    }
  }
}
</script>

<style>
:root {
  --color-primary: #7A78FF;
  --color-off: #CCCCFF;
  --color-secondary: #F8F9F0;
  --color-tertiary-gray: #E8E0E8;
  --color-tertiary-inputs: #BCB73E;
  --color-text: #000000;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: white;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: white;
}
</style>
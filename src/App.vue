<template>
  <div id="app">
    <!-- El toolbar solo se muestra si el usuario está autenticado -->
    <app-toolbar v-if="isAuthenticated" />

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
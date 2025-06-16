<template>
  <div id="app">
    <!-- Router view para mostrar el componente correspondiente a la ruta actual -->
    <router-view
        @login-success="handleLoginSuccess"
        @register-success="handleRegisterSuccess"
    />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false
    }
  },
  created() {
    // Verificar si hay un token almacenado para determinar si el usuario está autenticado
    this.checkAuthentication();

    // Forzar redirección a login si estamos en la ruta raíz
   /* if (this.$route.path === '/') {
      this.$router.push('/login');
    }*/
  },
  methods: {
    checkAuthentication() {
      // Verificar si hay un token en localStorage
      const token = localStorage.getItem('auth_token');
      this.isAuthenticated = !!token;
    },
    handleLoginSuccess() {
      this.isAuthenticated = true;
      this.$router.push('/rutas');
    },
    handleRegisterSuccess() {
      this.isAuthenticated = true;
      this.$router.push('/rutas');
    }
  },
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
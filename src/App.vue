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
  --color-white: #fff ;
  --color-success: #00A652 ;
  --color-danger: #FF2C2C ;
  --color-info: #478BFF ;
  --color-slate-950: oklch(12.9% 0.042 264.695);
  --color-slate-900: oklch(20.8% 0.042 265.755);
  --color-slate-800: oklch(27.9% 0.041 260.031);
  --color-slate-700: oklch(37.2% 0.044 257.287);
  --color-slate-600: oklch(44.6% 0.043 257.281);
  --color-slate-500: oklch(55.4% 0.046 257.417);
  --color-slate-400: oklch(70.4% 0.04 256.788);
  --color-slate-300: oklch(86.9% 0.022 252.894);
  --color-slate-200: oklch(92.9% 0.013 255.508);
  --color-slate-100: oklch(92.9% 0.013 255.508);
  --color-slate-50: oklch(98.4% 0.003 247.858);

}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: white;
}
</style>
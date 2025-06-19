<!-- src/components/AppHeader.vue -->
<template>
  <header class="app-header">
    <!-- Logo -->
    <div class="logo">
      <img src="@/assets/logo-chapaturuta.png" alt="Logo" />
    </div>

    <!-- Navegación centrada -->
<!--    <nav class="nav-links">
      <router-link to="/" exact>Inicio</router-link>
      <router-link to="/routes">Ver mis colecciones</router-link>
    </nav>-->

    <!-- Botón de perfil -->
    <div class="profile">
      <router-link :to="`${APP_ROUTES.AUTH.ROOT}/${APP_ROUTES.AUTH.LOGIN}`">
        <button class="profile-btn">
          ¿Gestionas colectivos?
        </button>
      </router-link>
    </div>
  </header>
  <main class="container">
    <router-view></router-view>
  </main>
</template>

<script>
import {APP_ROUTES} from "@/shared/services/routes.js";

export default {
  name: 'AppHeader',
  computed: {
    APP_ROUTES() {
      return APP_ROUTES
    }
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e5e5;
}

/* Logo */
.logo img {
  height: 50px;
}

/* Nav centrado */
.nav-links {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.nav-links a {
  color: #6b63ff;
  text-decoration: none;
  font-weight: 500;
}
.nav-links a.router-link-exact-active {
  text-decoration: underline;
}

/* Perfil a la derecha */
.profile {
  margin-left: auto;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid #6b63ff;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  color: #6b63ff;
  font-weight: 500;
  cursor: pointer;
}

.profile-btn .icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>

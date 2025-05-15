<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="logo-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </div>
    </div>

    <div class="toolbar-center">
      <router-link to="/inicio" class="nav-item">Inicio</router-link>
      <router-link to="/paraderos" class="nav-item">Paraderos</router-link>
      <router-link to="/rutas" class="nav-item">Rutas</router-link>
    </div>

    <div class="toolbar-right">
      <div class="profile-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Perfil</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppToolbar'
}
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.toolbar-left, .toolbar-right {
  flex: 1;
}

.toolbar-center {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.logo-container {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.nav-item {
  text-decoration: none;
  color: #333;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

.nav-item.router-link-active {
  color: #7A78FF;
  font-weight: 500;
}

.profile-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
  cursor: pointer;
}

.profile-icon span {
  font-size: 14px;
}
</style>
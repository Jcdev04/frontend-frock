<script>
export default {
  name: "companyToolbar",

  data() {
    return {
      showDropdown: false,
      companyImgUrl: '', // URL de la imagen de la empresa
      companyName: '', // Nuevo campo para el nombre de la empresa
      items: [ //para el button
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-sign-out',
          command: () => this.logout(),
        }
      ]
    }
  },

  created() {
    // Obtener el nombre de la empresa del usuario en localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    this.companyName = user?.companyName || 'Mi Empresa';
    this.companyImgUrl = user?.companyImgUrl || 'https://via.placeholder.com/150'; // URL por defecto si no hay imagen

  },

  methods: {
    logout() {
      // Eliminar el token de autenticación
      localStorage.removeItem('auth_token');

      // Redireccionar a la página de login
      this.$router.push('/auth/login');
    }
  }
}
</script>

<template>
  <pb-Toolbar class="toolbar">
    <template #start>
      <div class="card flex justify-center">
        <img src="@/assets/logo-chapaturuta.png" alt="ChapaTuRuta-Logo" class="logo" style="width: auto; height: 38px" />
      </div>
    </template>

    <template #center>
      <div class="flex items-center" style="gap: 20px">
        <router-link to="/company/home" class="nav-item">Inicio</router-link>
        <router-link to="/company/stops" class="nav-item">Paraderos</router-link>
        <router-link to="/company/routes" class="nav-item">Rutas</router-link>
      </div>
    </template>

    <template #end>
      <pb-SplitButton
        class="profile-button"
        dropdownIcon="pi pi-cog"
        :model="items"
        size="large"
        outlined
        severity="help"
      >
       <span class="flex items-center">
            <img :src="companyImgUrl" alt="logo" style="height: 1.5rem; width: 1.5rem; border-radius: 50%; margin-right: 0.5rem;" />
            <span>{{ companyName }}</span>
          </span>

      </pb-SplitButton>
    </template>
  </pb-Toolbar>
</template>


<style scoped>
.toolbar {
  border: none;
  font-family: Poppins, sans-serif;
  padding: 20px 15px;
}

.nav-item {
  text-decoration: none;
  color: #7A78FF;
  font-size: 14px;
  padding: 8px 2px;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

.nav-item.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid #7A78FF;
}

.profile-button{
  height: 35px;
}

</style>
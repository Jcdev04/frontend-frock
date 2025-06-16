<script>
import RouteCardComponent from '../components/route-card/route-card.component.vue';
import {RouteService} from '@/routes/services/route.service.js';
import PopUpCreateRouteComponent from "@/routes/components/routes-popUps/pop-up-create-route.component.vue";
import RoutesHeaderTitle from "@/routes/components/routes-header-title.component.vue";
import RoutesList from "@/routes/components/routes-list.component.vue";

export default {
  name: 'RoutesPage',
  components: {
    RoutesList,
    RoutesHeaderTitle,
    PopUpCreateRoute: PopUpCreateRouteComponent,
    RutaCard: RouteCardComponent,
    CreateRoutePopUp: PopUpCreateRouteComponent
  },
  data() {
    return {
      routes: [],
      isLoading: false,
      error: null
    }
  },
  created() {
    this.loadRoutes();
  },
  methods: {
    async loadRoutes() {
      this.isLoading = true;
      this.error = null;
      try {
        const routeService = new RouteService();
        this.routes = await routeService.getAllRoutes();
      } catch (error) {
        this.error = `Error al cargar rutas: ${error.message}`;
        // Mostrar toast
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      } finally{
        this.isLoading = false;
      }
    },
    abrirModalNuevaRuta() {
      this.modalVisible = true;
    },
    cerrarModal() {
      this.modalVisible = false;
    },
    async agregarNuevaRuta(rutaData) {
      try {
        await this.routeService.crearRuta(rutaData);
        await this.loadRoutes();
      } catch (error) {
        console.error('Error al agregar nueva ruta:', error);
      }
    }
  }
}
</script>

<template>
  <routes-header-title />
  <routes-list :routes="routes" :isLoading="isLoading" :error="error"/>
</template>


<style scoped>

</style>
<script>
import { RouteService } from "../../services/routes-api.service.js";
import RouteCard from "@/discovery/components/routes-list/route-card.vue";

import { routeAlphaService } from "@/discovery/services/route-alpha.service.js";


export default {
  name: "route-component",
  components: {RouteCard},
  data() {
    return {
      routes: [], // Almacena las rutas obtenidas
      isLoading: true, // Estado de carga
      error: null, // Estado de error
    };
  },
  async created() {
    const routeService = new RouteService();
    try {
      const response = await routeService.getRouteLinks();
      this.routes = response; // Asigna las rutas obtenidas
    } catch (err) {
      this.error = "Failed to load routes.";
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    formatPrice(price) {
      return `S/${price.toFixed(2)}`;
    },
    formatDuration(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return hours > 0 ? `${hours}hr ${mins > 0 ? mins + "min" : ""}` : `${mins}min`;
    },
    viewRouteDetails(routeId) {
      this.$router.push({name: 'route-detail', params: {routeId}});
    }
  },

  mounted() {
    routeAlphaService.getAll()
        .then(response => {
          // 'response' aquí ya es el array de datos, porque BaseService.getAll() devuelve response.data
          console.log('Conexión exitosa con routes:', response);
        })
        .catch(error => {
          console.error('Error al conectar con routes:', error);
        });
  }

};
</script>

<template>
  <div class="route-list-container">
    <h1>Available Routes</h1>
    <div v-if="isLoading" class="loading">Loading routes...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="container-stops">
      <div
          v-for="route in routes"
          :key="route.id"
          class="route-card"
      >
        <route-card :start="route.start"
                    :route-info="route.route"
                    :end="route.end"  @click="viewRouteDetails(route.route.id)"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.route-list-container {
  padding: 20px;
}

.loading {
  font-size: 18px;
  color: #666;
}

.error {
  color: red;
}

.container-stops{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;              /* Espacio minimalista entre tarjetas */
  padding: 1rem 0;        /* Separación vertical opcional */
  width: 100%;
  max-width: 1280px;
  margin: 20px auto;
}

</style>
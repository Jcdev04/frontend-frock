<script>
import { RouteService } from "../../services/routes-api.service.js";

export default {
  name: "route-component",
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
      const response = await routeService.getAllRoutes();
      this.routes = response.data; // Asigna las rutas obtenidas
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
      this.$router.push({name: 'RouteDetail', params: {id: routeId}});
    }
  },
};
</script>

<template>
  <div class="route-list-container">
    <h1>Available Routes</h1>
    <div v-if="isLoading" class="loading">Loading routes...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="route-list">
      <div
          v-for="route in routes"
          :key="route.id"
          class="route-card"
          @click="viewRouteDetails(route.id)"
      >
        <h2 class="route-title">Route Details</h2>
        <p><strong>Route ID:</strong> {{ route.id }}</p>
        <p><strong>Price:</strong> {{ formatPrice(route.price) }}</p>
        <p><strong>Duration:</strong> {{ formatDuration(route.duration_min) }}</p>
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

.route-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.route-card {
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.route-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
}
</style>
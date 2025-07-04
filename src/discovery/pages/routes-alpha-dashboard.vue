<script>
import RoutesAlphaList from "@/discovery/components/routes-alpha/routes-alpha-list.component.vue";
import RoutesAlphaFilter from "@/discovery/components/routes-alpha/routes-alpha-filter.component.vue";
import { routeAlphaService } from "@/discovery/services/route-alpha.service.js";

import { DistrictService }  from "@/geography/services/district.service.js";

export default {
  name: "routes-alpha-dashboard",
  components: {
    RoutesAlphaList,
    RoutesAlphaFilter
  },

  data() {
    return {
      districts: [],
      routes: [],
      isLoading: false,
      error: null
    };
  },

  methods: {
    async loadRoutes() {
      this.isLoading = true;
      this.error = null;
      try {

        this.routes = await routeAlphaService.getAll();

        // Log the results to the console
        console.log("All routes:",this.routes);

      } catch (err) {
        this.error = `Error loading routes: ${err.message}`;
        // Show toast
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      } finally {
        this.isLoading = false;
      }
    },

    async loadDistricts() {
      try {
        const districtService = new DistrictService();
        this.districts = await districtService.getAll();
      } catch (err) {
        this.error = `Error loading districts: ${err.message}`;
        // Show toast
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      }
    },

    async loadFilteredRoutes(districtId) {
      this.isLoading = true;
      this.error = null;
      try {
        this.routes = await routeAlphaService.getRoutesByDistrictId(districtId);
        console.log("Filtered routes by district", this.routes);
      } catch (err) {
        this.error = `Error loading filtered routes: ${err.message}`;
        // Show toast
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      } finally {
        this.isLoading = false;
      }
    },

    async handleBuscar(districtId){ //recibido del emit, si hubiera mas de un 1 dato pues seria segun el orden de emit
      console.log("handleBuscar called with districtId:", districtId);
      if (districtId) {
        await this.loadFilteredRoutes(districtId);
      } else {
        // If no districtId is provided, load all routes
        console.log("districtId not found");
        await this.loadRoutes();
      }
    },

    async handleBorrar() {
      console.log("handleBorrar called");
      // Clear the filter and reload all routes
      await this.loadRoutes();
    }
  },
  mounted() {
    this.loadRoutes();
    this.loadDistricts();
  },
}
</script>

<template>
  <section class="routes-alpha-dashboard">
    <routes-alpha-filter :districts="districts" @buscar="handleBuscar" @borrar="handleBorrar"/>
    <routes-alpha-list :routes="routes" :isLoading="isLoading" :error="error"/>
  </section>
</template>

<style scoped>

.routes-alpha-dashboard {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding-right: 8rem;
  padding-left: 8rem;

  padding-top: 3rem;
}

</style>
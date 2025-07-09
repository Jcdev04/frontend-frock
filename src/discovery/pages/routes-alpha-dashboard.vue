<script>
import RoutesAlphaList from "@/discovery/components/routes-alpha/routes-alpha-list.component.vue";
import RoutesAlphaFilter from "@/discovery/components/routes-alpha/routes-alpha-filter.component.vue";
import { routeAlphaService } from "@/discovery/services/route-alpha.service.js";

import { DistrictService }  from "@/geography/services/district.service.js";
import { RegionService } from "@/geography/services/region.service.js";
import { ProvinceService } from "@/geography/services/province.service.js";

export default {
  name: "routes-alpha-dashboard",
  components: {
    RoutesAlphaList,
    RoutesAlphaFilter
  },

  data() {
    return {
      regions: [],
      provinces: [],
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

      } catch (err) {
        this.error = `Error loading routes: ${err.message}`;
        // Show toast
        this.$toast.add({
          severity: 'info',
          summary: 'Information',
          detail: this.error
        });
      } finally {
        this.isLoading = false;
      }
    },

    async loadGeographicData() {
      try {
        const regionService = new RegionService();
        const provinceService = new ProvinceService();
        const districtService = new DistrictService();

        // Fetch all data in parallel
        const [regions, provinces, districts] = await Promise.all([
          regionService.getAll(),
          provinceService.getAll(),
          districtService.getAll()
        ]);

        this.regions = regions;
        this.provinces = provinces;
        this.districts = districts;

      } catch (err) {
        this.error = `Error loading geographic data: ${err.message}`;
        this.$toast.add({
          severity: 'error',
          summary: 'Error de Carga',
          detail: this.error,
          life: 3000
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
    this.loadGeographicData();
  },
}
</script>

<template>
  <section class="routes-alpha-dashboard">
    <routes-alpha-filter
        :regions="regions"
        :provinces="provinces"
        :districts="districts"
        @buscar="handleBuscar"
        @borrar="handleBorrar"
    />
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
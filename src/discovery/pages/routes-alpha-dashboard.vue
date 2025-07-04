<script>
import RoutesAlphaList from "@/discovery/components/routes-alpha/routes-alpha-list.component.vue";
import RoutesAlphaFilter from "@/discovery/components/routes-alpha/routes-alpha-filter.component.vue";
import { routeAlphaService } from "@/discovery/services/route-alpha.service.js";

export default {
  name: "routes-alpha-dashboard",
  components: {
    RoutesAlphaList,
    RoutesAlphaFilter
  },

  data() {
    return {
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
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.loadRoutes();
  },
}
</script>

<template>
  <section class="routes-alpha-dashboard">
    <routes-alpha-filter/>
    <routes-alpha-list :routes="routes" :isLoading="isLoading" :error="error"/>
  </section>
</template>

<style scoped>

.routes-alpha-dashboard {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  padding-right: 5rem;
  padding-left: 5rem;

  padding-top: 3rem;
}

</style>
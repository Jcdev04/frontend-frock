<script>
//imports
import StopsHeaderTitle from "@/network/components/stops-header-title.component.vue";
import stopsList from "@/network/components/stops-list.component.vue";
import { StopService } from "@/network/services/stop.service.js";
import {ref} from "vue";

//rest of the script
export default {
  components: {
    StopsHeaderTitle,
    stopsList,
  },
  data() {
    return {
      stops: [],
      isLoading: false,
      error: null
    };
  },

  methods: {
    async loadStops() {
      this.isLoading = true;
      this.error = null;
      try {
        const service = new StopService();
        this.stops = await service.getStops();
      } catch (err) {
        this.error = `Error al cargar paraderos: ${err.message}`;
        // Mostrar toast
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      } finally {
        this.isLoading = false;
      }
    },

    async handleUpdated() {
      await this.loadStops();
    },
    async handleDeleted() {
      await this.loadStops();
    },

    async handleCreated() {
      await this.loadStops();
    }
  },
  mounted() {
    this.loadStops();
  }
}
</script>

<template>
  <stops-header-title @created="handleCreated"/>
  <stops-list :stops="stops" :isLoading="isLoading" :error="error" @updated="handleUpdated" @deleted="handleDeleted"/>
</template>
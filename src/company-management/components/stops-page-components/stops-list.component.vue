<script>
import stopCard from "./stop-card/stop-card.component.vue";
import { StopService } from '../../services/stop-services/stop.service.js';

export default {
  name: "stopsList",
  components: {
    stopCard
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
    }
  },
  mounted() {
    this.loadStops();
  }
}

</script>

<template>
  <pb-Toast/>
  <pb-ProgressSpinner v-if="isLoading" />
  <pb-Message v-if="error" severity="error" :closable="false">
    {{ error }}
  </pb-Message>
  <section v-for="stop in stops" :key="stop.id" class="container-paraderos">
    <stop-card :stop="stop" />
  </section>
  <pb-ConfirmDialog/>

</template>

<style scoped>
.container-paraderos {
  /**/
  width: 100%;

  /**/
  display: flex;
  flex-direction: column;

  /**/
  padding: 10px 0;

  /**/
  gap: 10px;
}
</style>
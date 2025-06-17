<script>
import routeCard from "./route-card/route-card.component.vue";


export default {
  name: "routesList",
  components: {
    routeCard
  },
  props:{
    routes: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
}

</script>

<template>
  <pb-Toast/>
  <pb-ProgressSpinner v-if="isLoading" />
  <pb-Message v-if="error" severity="error" :closable="false">
    {{ error }}
  </pb-Message>
  <section class="rutas-grid">
    <routeCard
        v-for="route in routes"
        :key="route.id"
        :ruta="route"
    />
  </section>

  <pb-ConfirmDialog/>

</template>

<style scoped>

.rutas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

/* Responsive para tablets */
@media (max-width: 1200px) {
  .rutas-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }
}

@media (max-width: 992px) {
  .rutas-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* Responsive para móviles */
@media (max-width: 640px) {
  .rutas-grid {
    grid-template-columns: 1fr;
  }
}
</style>
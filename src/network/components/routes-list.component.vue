<script>
import routeCard from "./route-card.component.vue";
import stopCard from "@/network/components/stop-card.component.vue";


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
  emits: ['updated', 'deleted'],
}

</script>

<template>
  <pb-Toast/>
  <pb-ProgressSpinner v-if="isLoading" />
  <pb-Message v-else-if="error" severity="error" :closable="false">
    {{ error }}
  </pb-Message>
  <template v-else-if="routes.length>0">
    <section class="rutas-grid">
        <routeCard
            v-for="route in routes"
            :key="route.id"
            :ruta="route"
            @updated="$emit('updated', $event)"
            @deleted="$emit('deleted', $event)"
        />
    </section>
  </template>
  <template v-else>
    <pb-Message severity="info" :closable="false">
      <template #icon>
        <i class="pi pi-info-circle"></i>
      </template>
      No tienes rutas registradas aún
    </pb-Message>
  </template>
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
<script>
import stopCard from "./stop-card.component.vue";


export default {
  name: "stopsList",
  components: {
    stopCard
  },

  props:{
    stops: {
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

  emits: ['updated', 'deleted']
}

</script>

<template>
  <pb-Toast/>
  <pb-ProgressSpinner v-if="isLoading" />
  <pb-Message v-if="error" severity="error" :closable="false">
    {{ error }}
  </pb-Message>

  <section class="container-paraderos">
    <template v-if="stops.length>0">
      <stop-card
          v-for="stop in stops"
          :key="stop.id"
          :stop="stop"
          @updated="$emit('updated', $event)"
          @deleted="$emit('deleted', $event)"
      />
    </template>
    <template v-else>
      <pb-Message severity="info" :closable="false">
        <template #icon>
          <i class="pi pi-info-circle"></i>
        </template>
        No tienes paraderos registrados aún
      </pb-Message>
    </template>
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
  gap: 20px;
}
</style>
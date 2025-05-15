<script setup>

import AppToolbarStops from "@/components/shared/component/AppToolbarStops.vue";
import StopCard from "@/components/stops/component/StopCard.vue";
</script>

<template>
  <app-toolbar-stops />

  <div class="container-stops">

  </div>
</template>

<style scoped>
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
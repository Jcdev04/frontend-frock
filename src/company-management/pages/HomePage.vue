<script setup>

import KPICard from "@/company-management/components/KPICard.vue";
import {CurrencyDollarIcon} from "@heroicons/vue/24/solid/index.js";
import {MapPinIcon} from "@heroicons/vue/24/solid/index.js";
import {StopCircleIcon} from "@heroicons/vue/24/solid/index.js";
import {ClockIcon} from "@heroicons/vue/24/solid/index.js";
import {ArrowRightIcon} from "@heroicons/vue/16/solid/index.js";
import {PhotoIcon} from "@heroicons/vue/16/solid/index.js";
import StopCard from "@/company-management/components/StopCard.vue";



</script>

<template>
  <div class="container">
    <h1>¡Usuario, te damos la bienvenida!</h1>
    <h2>Resumen General</h2>
    <div class="kpi-grid">
      <KPICard
          :icon="CurrencyDollarIcon"
          value="S/ 6.50"
          label="Tarifa promedio"
      />
      <KPICard
          :icon="MapPinIcon"
          value=12
          label="Total de paraderos"
      />
      <KPICard
          :icon="StopCircleIcon"
          value=12
          label="Total de rutas"
      />
      <KPICard
          :icon="ClockIcon"
          value="30 min"
          label="Intervalo promedio"
      />
    </div>
    <div>
      <h2>Tus paraderos</h2>
      <p class="">
        <span>Editar Paraderos </span>
        <ArrowRightIcon class="icono"/>
      </p>
    </div>
    <section class="container-paraderos">
      <stop-card />
      <stop-card />
      <stop-card />
    </section>
  </div>
</template>

<style scoped>
.container{
  max-width: 1280px;
  width: 100%;
  padding: 10px;
  margin: 0px auto;
}
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1rem;
}
.container-paraderos {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}


</style>


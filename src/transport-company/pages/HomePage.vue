<script setup>

import KPICard from "@/transport-company/components/KPICard.vue";
import {CurrencyDollarIcon} from "@heroicons/vue/24/solid/index.js";
import {MapPinIcon} from "@heroicons/vue/24/solid/index.js";
import {StopCircleIcon} from "@heroicons/vue/24/solid/index.js";
import {ClockIcon} from "@heroicons/vue/24/solid/index.js";
import CompanyInfoCard from "@/transport-company/components/CompanyEditCard.vue";

</script>

<template>
  <div class="home-page-header">
    <h1>¡Usuario, te damos la bienvenida!</h1>
  </div>
  <section class="kpi-container">
    <h2>Resumen General</h2>
    <div class="kpi-grid">
      <KPICard
          :icon="CurrencyDollarIcon"
          value="S/ 6.50"
          label="Tarifa promedio"
          color="#7A78FF"
      />
      <KPICard
          :icon="MapPinIcon"
          value=12
          label="Total de paraderos"
          color="#00A652"
      />
      <KPICard
          :icon="StopCircleIcon"
          value=12
          label="Total de rutas"
          color="#478BFF"
      />
      <KPICard
          :icon="ClockIcon"
          value="30 min"
          label="Intervalo promedio"
          color="#FF2C2C"
      />
    </div>
  </section>

  <section class="company-info-container">
    <CompanyInfoCard />
  </section>

</template>

<style scoped>
.home-page-header h1{
  font-size: 2.5rem;
  color: var(--color-slate-300);
}

.kpi-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.kpi-container h2{
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-primary);
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1rem;
}

.button-edit-stops h2{
  font-size: 1.75rem;
  font-weight: 600;
}

.button-edit-stops button{
  display: flex;
  background-color: white;
  border: none;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
}

.button-edit-stops .icon{
  width: 1rem;
}

.company-info-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}
</style>
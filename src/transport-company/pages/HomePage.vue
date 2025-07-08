<script setup>
import { ref, onMounted } from 'vue';
import KPICard from "@/transport-company/components/KPICard.vue";
import {CurrencyDollarIcon} from "@heroicons/vue/24/solid/index.js";
import {MapPinIcon} from "@heroicons/vue/24/solid/index.js";
import {StopCircleIcon} from "@heroicons/vue/24/solid/index.js";
import {ClockIcon} from "@heroicons/vue/24/solid/index.js";
import CompanyInfoCard from "@/transport-company/components/CompanyEditCard.vue";
import { StopService } from "@/network/services/stop.service.js";
import { RouteAlphaService } from "@/discovery/services/route-alpha.service.js";

const user = JSON.parse(localStorage.getItem('user'));
const companyName = user?.companyName || "tu empresa";
const companyId = user?.companyId;

const totalStops = ref(0);
const totalRoutes = ref(0);

onMounted(async () => {
  if (companyId) {
    const stopService = new StopService();
    const routeService = new RouteAlphaService();

    try {
      const stops = await stopService.getStopsByCompanyId(companyId);
      totalStops.value = stops.length;
    } catch (error) {
      console.error("Error al obtener paraderos:", error);
      totalStops.value = 0;
    }

    try {
      const routes = await routeService.getRoutesByCompanyId(companyId);
      totalRoutes.value = routes.length;
    } catch (error) {
      console.error("Error al obtener rutas:", error);
      totalRoutes.value = 0;
    }
  }
});
</script>

<template>
  <div class="home-page-header">
    <h1>
      ¡<span class="company-name">{{ companyName }}</span>, te damos la bienvenida!
    </h1>
  </div>
  <section class="kpi-container">
    <h2>Resumen General</h2>
    <div class="kpi-grid">
      <KPICard
          :icon="MapPinIcon"
          :value="totalStops"
          label="Total de paraderos"
          color="#00A652"
      />
      <KPICard
          :icon="StopCircleIcon"
          :value="totalRoutes"
          label="Total de rutas"
          color="#478BFF"
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
  letter-spacing: 2px;
}

.company-name {
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: 1px;
  font-style: italic;
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
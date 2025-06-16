<script setup>

import KPICard from "@/transport-company/components/KPICard.vue";
import {CurrencyDollarIcon} from "@heroicons/vue/24/solid/index.js";
import {MapPinIcon} from "@heroicons/vue/24/solid/index.js";
import {StopCircleIcon} from "@heroicons/vue/24/solid/index.js";
import {ClockIcon} from "@heroicons/vue/24/solid/index.js";
import {ArrowRightIcon} from "@heroicons/vue/16/solid/index.js";
import {PhotoIcon} from "@heroicons/vue/16/solid/index.js";
import StopsListComponent from "@/stops/components/stops-page-components/stops-list.component.vue";



</script>

<template>
   <div class="home-page-header">
    <h1>¡Usuario, te damos la bienvenida!</h1>
   </div>

  <section class="stops-container">
    <div class="button-edit-stops">
      <h2>Tus paraderos</h2>
      <pb-Button>
        <span style="background-color: #CCCCFF">Editar Paraderos</span>
        <ArrowRightIcon class="icon"/>
      </pb-Button>
    </div>
  </section>
</template>

<style scoped>
.home-page-header h1{
  margin-bottom: 40px;
  font-size: 2.5rem;
}


.kpi-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.kpi-container h2{
  font-size: 1.75rem;
  font-weight: 600;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1rem;
}

.stops-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-edit-stops{
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>


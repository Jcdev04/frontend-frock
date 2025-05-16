<script setup>

import AppToolbarStops from "@/components/shared/component/AppToolbarStops.vue";
import StopCard from "@/components/stops/component/StopCard.vue";
import { Form } from '@primevue/forms';
import Select from "primevue/select";
import { ref } from 'vue'


const cities = ref([
  { name: 'Lima',       code: 'LIM' },
  { name: 'Cusco',      code: 'CUS' },
  { name: 'Arequipa',   code: 'AQP' },
  { name: 'Trujillo',   code: 'TRU' },
  { name: 'Iquitos',    code: 'IQT' }
])
const selectedCity = ref(null)

function onCityChange(event) {
  // event.value contiene el código de la ciudad seleccionada
  console.log('Ciudad seleccionada:', event.value)
  // aquí puedes lanzar lógicas extra, por ejemplo:
  // fetchDatosDeCiudad(event.value)
}
</script>

<template>
  <app-toolbar-stops />
  <div class="inputs-container">
    <div class="container-selects">
      <Select class="region" onchange="onCityChange(e)"  v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Selecciona una ciudad"></Select>
      <Select class="province"  v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Selecciona una ciudad"></Select>
      <Select class="district"  v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Selecciona una ciudad"></Select>
      <Select class="city"  v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Selecciona una ciudad"></Select>
    </div>
    <button>Buscar</button>
  </div>

  <div class="container-stops">
    <StopCard/>
    <StopCard/>
    <StopCard/>
    <StopCard/>
    <StopCard/>
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
.inputs-container{
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 1rem 0;
}
/* Solo la fila de selects */
.container-selects {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  flex: 1; /* Ocupa todo el ancho disponible */
}

/* Estilos comunes a cada Select */
.container-selects .p-dropdown {
  width: 100%;
}

/* Ajuste del botón */
.inputs-container > button {
  padding: 0.75rem 1.5rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.inputs-container > button:hover {
  background-color: #555;
}
</style>
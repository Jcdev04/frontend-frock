<script setup>
import {onMounted, ref, watch} from 'vue';
import {StopService} from "@/network/services/stop.service.js";
import {RouteService} from "@/network/services/route.service.js";

// Definición de props/emits (más explícito)
const emit = defineEmits(['update:value', 'created']);

const stopService = new StopService();
const routeService = new RouteService()

// Estado reactivo
const visiblePop = ref(false);
const loading = ref(false);
const error = ref("");
const isLoading = ref(false);

const stops_origin = ref([]);
const stops_destination = ref([]);

// Variables para almacenar los valores seleccionados
const selectedFirstStop = ref(null); // Para el primer paradero
const selectedSecondStop = ref(null); // Para el segundo paradero

const closeModal = () =>{
  visiblePop.value = false;
}

const routeForm = ref({
  duration: null,
  price: null,
  frequency: null,
});

// Métodos
const addRoute = async () => {
  isLoading.value = true;
  try{

  }catch (err){

  } finally {
    isLoading.value = false;
  }
  // Resetear formulario
  resetForm()
};

const loadSelects = async () => {
  try {
    loading.value = true;
    stops_origin.value = await stopService.getStopsForSelect('comp-1');
  } catch (err) {
    error.value = 'Error al cargar paraderos';
  } finally {
    loading.value = false;
  }
}

// Filtra los paraderos destino cuando cambia el origen
watch(selectedFirstStop, (newValue) => {
  // Resetear el segundo select
  selectedSecondStop.value = null;

  if (newValue) {
    // Filtrar todos los stops excepto el seleccionado
    stops_destination.value = stops_origin.value.filter(stop => stop.value !== newValue);
  } else {
    // Si no hay selección en el primer select, vaciar opciones
    stops_destination.value = [];
  }
});

const resetForm = ()=>{
  routeForm.value = {
    duration: null,
    price: null,
    frequency: null,
  };
  selectedFirstStop.value= null; // Para el primer paradero
  selectedSecondStop.value = null; // Para el segundo paradero
}

onMounted(()=>{
  loadSelects();
}
)
</script>

<template>
  <pb-Button class="nueva-ruta-button" icon="pi pi-plus" label="Nueva ruta" @click="visiblePop = true"/>
  <pb-Dialog v-model:visible="visiblePop" modal :style="{ width: '50rem' }">
      <template #header>
        <h1 class="title">Nueva Ruta</h1>
      </template>
      <pb-Form @submit.prevent="addRoute">
        <div class="form-container">
          <pb-IftaLabel class="labelSelectField">
            <pb-Select inputId="stop_a" v-model="selectedFirstStop" :options="stops_origin" option-label="label" option-value="value" class="input-field"/>
            <label for="stop_a">Primer paradero</label>
          </pb-IftaLabel>
          <pb-IftaLabel class="labelSelectField">
            <pb-Select inputId="stop_b" v-model="selectedSecondStop" :options="stops_destination" option-label="label" option-value="value" class="input-field" :disabled="!selectedFirstStop"/>
            <label for="stop_b">Segundo paradero</label>
          </pb-IftaLabel>

          <pb-IftaLabel class="labelSelectField">
            <label for="duration">Duración</label>
            <pb-InputText id="duration" v-model="routeForm.duration" class="input-field"/>
          </pb-IftaLabel>

          <pb-IftaLabel class="labelSelectField">
            <label for="price">Precio</label>
            <pb-InputText id="price" v-model="routeForm.price" class="input-field"/>
          </pb-IftaLabel>

          <pb-IftaLabel class="labelSelectField">
            <label for="frequency">Frecuencia</label>
            <pb-InputText id="frequency" v-model="routeForm.frequency" class="input-field"/>
          </pb-IftaLabel>

          <div class="button-container">
            <pb-Button label="Cancelar" icon="pi pi-times"
                       class="cancel-button"
                       @click="()=>{
                         visiblePop = false;
                         resetForm();
                       }" />
            <pb-Button label="Crear" icon="pi pi-check" class="create-button" type="submit" />
<!-- :disabled="!isFormValid && !submitted"            -->
          </div>
        </div>
      </pb-Form>
  </pb-Dialog>
</template>

<style scoped>
.labelSelectField{
  --p-iftalabel-color: var(--color-slate-400);
  --p-iftalabel-focus-color: var(--color-primary);
}

.input-field {
  border-color: var(--color-off);
  --p-inputtext-focus-border-color: var(--color-primary);
  width: 100%;
}

.button-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.button-container button{
  width: 100%;
}

.cancel-button{
  background-color: #FFCDBA;
  border: none;
}

.cancel-button.p-button:hover{
  background-color: #f3a88c;
  border: none;
}

.create-button{
  background-color: #66e1a3;
  border: none;
}

.create-button.p-button:disabled
{
  background-color: #66e1a3;
  border: none;
}

.create-button.p-button:hover
{
  background-color: #00A652;
  border: none;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.title{
  color: var(--color-primary);
  border-bottom: var(--color-primary) solid 1px;
  padding: 10px;
}

.nueva-ruta-button{
  /*Flex para centrar*/
  display: flex;
  align-items: center;

  /*Button en si*/
  background-color: var(--color-primary);

  border: none;
  border-radius: 8px;

  padding: 8px 16px;

  max-height: 40px;
  height: 100%;

  max-width: 200px;
  width: 100%;

  /*Text Format*/
  font-size: 16px;
  font-family: Poppins, sans-serif;
  color: var(--color-white);
}

.nueva-ruta-button.p-button:hover{
  cursor: pointer;
  background-color: var(--color-off);
  color: var(--color-white);
  border: none;
}
</style>
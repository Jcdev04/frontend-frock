<script>
import { ref } from "vue"; //principalmente lo usamos para el atributo visible del button
import { StopService } from '@/network/services/stop.service.js';
import {GeographyService} from "@/geography/services/geography.service.js";

export default {
  name: "popUpNewStop",

  setup() {
    const visiblePop = ref(false); //variable visible que controlara la aparicion del popUp

    return { visiblePop };
  },

  emits: ['update:value', 'created'],

  data() {
    return {
      paradero: {
        name: '',
        phone: '',
        address: '',
        reference: '',
        fk_id_locality: ''
      },
      locationHierarchy: [],
      submitted: false
    };
  },

  computed: {
    isFormValid() {
      return this.paradero.name &&
          this.paradero.phone &&
          this.paradero.address &&
          this.paradero.reference &&
          this.paradero.fk_id_locality;
    },
  },

  methods: {
    async loadDropdowns() {
      try {
        const service = new GeographyService();
        this.locationHierarchy = await service.getFullHierarchy();
      } catch (err) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al cargar opciones: ${err.message}`,
          life: 3000
        });
      }
    },

    async createStop() {
      this.submitted = true;
      if (!this.isFormValid) {
        this.$toast.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'Por favor completa todos los campos requeridos',
          life: 3000
        });
        return;
      }
      try {
        const service = new StopService();
        const created = await service.createStop({...this.paradero, fk_id_company: "comp-1"});
        this.$emit('created', created);
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Paradero creado correctamente',
          life: 3000
        });

        //cuando se cree el paradero vamos a cerrar el popup
        this.visiblePop = false;

        this.paradero = {
          name: '',
          phone: '',
          address: '',
          reference: '',
          fk_id_company: 'comp-1',
          fk_id_locality: ''
        };
        this.submitted = false;
      } catch (err) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al crear paradero: ${err.message}`,
          life: 3000
        });
      }
    }
  },

  mounted() {
    this.loadDropdowns(); //desde aqui pre-cargamos los datos para los dropdowns
  }
};
</script>

<template>
  <pb-Button class="nuevo-paradero-button" icon="pi pi-plus" label="Nuevo Paradero" @click="visiblePop = true"/>

  <pb-Dialog v-model:visible="visiblePop" modal :style="{ width: '50rem' }">
    <template #header>
      <h1 class="title">Nuevo Paradero</h1>
    </template>

    <pb-Form @submit="createStop">

      <div class="form-container">
        <pb-IftaLabel class="labelSelectField">
          <label for="name">Nombre</label>
          <pb-InputText id="name" v-model="paradero.name" class="input-field" />
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <label for="phone">Teléfono</label>
          <pb-InputText id="phone" v-model="paradero.phone" class="input-field"/>
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <label for="address">Dirección</label>
          <pb-InputText id="address" v-model="paradero.address" placeholder="Ej: Av. Norte 789" class="input-field"/>
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <label for="reference">Referencia</label>
          <pb-InputText id="reference" v-model="paradero.reference" placeholder="Ej: Frente al Teatro" class="input-field"/>
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <pb-CascadeSelect class="cascade-field" inputId="locality" v-model="paradero.fk_id_locality" :options="locationHierarchy" option-label="name" option-value="id" option-group-label="name" :option-group-children="['provinces', 'districts', 'localities']"  placeholder="Selecciona la ubicación"/>
          <label for="locality">Localidad</label>
        </pb-IftaLabel>

<!--        <div class="p-field">
          <label for="company">Empresa</label>
          <pb-Select id="company" v-model="paradero.fk_id_company" :options="companies" option-label="label" option-value="value" />
        </div>-->

        <div class="button-container">
          <pb-Button label="Cancelar" icon="pi pi-times" class="cancel-button" @click="visiblePop = false" />
          <pb-Button label="Crear" icon="pi pi-check" class="create-button" type="submit" :disabled="!isFormValid && !submitted" />
        </div>
      </div>
    </pb-Form>
  </pb-Dialog>
</template>

<style scoped>
.cascade-field {
  border-color: var(--color-off);
  --p-cascadeselect-focus-border-color: var(--color-primary);
  max-height: 200px; /* Ajusta según lo necesario */
  overflow-y: auto;
}

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

.nuevo-paradero-button{
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

.nuevo-paradero-button.p-button:hover{
  cursor: pointer;
  background-color: var(--color-off);
  color: var(--color-white);
  border: none;
}

</style>
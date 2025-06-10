<script>
import { ref } from "vue"; //principalmente lo usamos para el atributo visible del button
import { StopService } from '../../../services/stop-services/stop.service.js';

export default {
  name: "popUpNewStop",

  setup() {
    const visiblePop = ref(false); //variable visible que controlara la aparicion del popUp


    return { visiblePop };
  },

  props: ['value'],

  emits: ['update:value', 'created'],

  data() {
    return {
      paradero: {
        name: '',
        phone: '',
        address: '',
        reference: '',
        fk_id_company: '',
        fk_id_locality: ''
      },
      companies: [],
      localities: [],
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
          this.paradero.fk_id_company &&
          this.paradero.fk_id_locality;
    }
  },

  methods: {
    async loadDropdowns() {
      try {
        const service = new StopService();
        this.companies = await service.getCompanies();
        this.locationHierarchy = await service.getLocationHierarchy();
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
        const created = await service.createStop(this.paradero);
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
          fk_id_company: '',
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

  <pb-Dialog v-model:visible="visiblePop" modal header="Nuevo Paradero" :style="{ width: '50rem' }">
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
          <pb-CascadeSelect class="cascade-field" inputId="locality" v-model="paradero.fk_id_locality" :options="locationHierarchy" option-label="name" option-value="code" option-group-label="name" :option-group-children="['provinces', 'districts', 'localities']"  placeholder="Selecciona la ubicación"/>
          <label for="locality">Localidad</label>
        </pb-IftaLabel>

        <div class="p-field">
          <label for="company">Empresa</label>
          <pb-Select id="company" v-model="paradero.fk_id_company" :options="companies" option-label="label" option-value="value" />
        </div>

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
  border-color: #CCCCFF;
  --p-cascadeselect-focus-border-color: #7A78FF;
}

.labelSelectField{
  --p-iftalabel-color: #484848;
  --p-iftalabel-focus-color: #7A78FF;
}

.input-field {
  border-color: #CCCCFF;
  --p-inputtext-focus-border-color: #7A78FF;
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
  color: #7A78FF;
  border-bottom: #7A78FF solid 1px;
  padding: 10px;
}

.nuevo-paradero-button{
  /*Flex para centrar*/
  display: flex;
  align-items: center;

  /*Button en si*/
  background-color: #7A78FF;

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
  color: white;
}

.nuevo-paradero-button.p-button:hover{
  cursor: pointer;
  background-color: #CCF;
  color: white;
  border: none;
}

</style>
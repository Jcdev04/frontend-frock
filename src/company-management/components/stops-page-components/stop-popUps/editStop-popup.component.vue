<script>
import { ref } from "vue"; //principalmente lo usamos para el atributo visible del button
import { StopService } from '../../../services/stop-services/stop.service.js';
import { useToast } from 'primevue/usetoast';

export default {
  name: "popUpEditStop",

  setup() {
    const visiblePop = ref(false); //variable visible que controlara la aparicion del popUp
    return { visiblePop };
  },

  props: {
    stop: {
      type: Object,
      required: true
    }
  },

  emits: ['update:value', 'updated'],

  data() {
    return {
      paradero: {
        id: '',
        name: '',
        phone: '',
        address: '',
        reference: '',
        fk_id_company: '',
        fk_id_locality: ''
      },
      initialParadero: null,
      companies: [],
      localities: [],
      submitted: false
    };
  },
  computed: {
    visible: {
      get() { return this.value; },
      set(val) { this.emit('update:value', val); }
    },
    isFormValid() {
      return this.paradero.name &&
          this.paradero.phone &&
          this.paradero.address &&
          this.paradero.reference &&
          this.paradero.fk_id_company &&
          this.paradero.fk_id_locality;
    },
    hasChanges() {
      if (!this.initialParadero) return false;
      return JSON.stringify(this.paradero) !== JSON.stringify(this.initialParadero);
    }
  },
  methods: {
    async loadDropdowns() {
      try {
        const service = new StopService();
        this.companies = await service.getCompanies();
        this.localities = await service.getLocalities();
      } catch (err) {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al cargar opciones: ${err.message}`,
          life: 3000
        });
      }
    },
    async updateStop() {
      this.submitted = true;
      if (!this.isFormValid) {
        this.toast.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'Por favor completa todos los campos requeridos',
          life: 3000
        });
        return;
      }
      try {
        const service = new StopService();
        const updated = await service.updateStop(this.paradero.id, this.paradero);
        this.emit('updated', updated);
        this.toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Paradero actualizado correctamente',
          life: 3000
        });
        this.visible = false;
        this.submitted = false;
      } catch (err) {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al actualizar paradero: ${err.message}`,
          life: 3000
        });
      }
    },
    initializeForm() {
      this.paradero = {
        id: this.stop.id,
        name: this.stop.name || '',
        phone: this.stop.phone || '',
        address: this.stop.address || '',
        reference: this.stop.reference || '',
        fk_id_company: this.stop.fk_id_company || '',
        fk_id_locality: this.stop.fk_id_locality || ''
      };
      this.initialParadero = { ...this.paradero };
    }
  },
  watch: {
    stop: {
      immediate: true,
      handler() {
        if (this.stop) {
          this.initializeForm();
          this.loadDropdowns();
        }
      }
    }
  }
};

</script>

<template>
  <pb-Button class="edit-button" icon="pi pi-pencil" @click="visiblePop = true"/>

  <pb-Dialog v-model:visible="visiblePop" header="Editar Paradero" :modal="true" :style="{ width: '30rem' }">
    <pb-Form @submit="updateStop">
      <div class="p-field">
        <label for="name">Nombre</label>
        <pb-InputText id="name" v-model="paradero.name" :class="{ 'p-invalid': !paradero.name && submitted }" required />
        <small v-if="!paradero.name && submitted" class="p-error">El nombre es obligatorio</small>
      </div>
      <div class="p-field">
        <label for="phone">Teléfono</label>
        <pb-InputText id="phone" v-model="paradero.phone" :class="{ 'p-invalid': !paradero.phone && submitted }" required />
        <small v-if="!paradero.phone && submitted" class="p-error">El teléfono es obligatorio</small>
      </div>
      <div class="p-field">
        <label for="address">Dirección</label>
        <pb-InputText id="address" v-model="paradero.address" placeholder="Ej. Av. Norte 789" :class="{ 'p-invalid': !paradero.address && submitted }" required />
        <small v-if="!paradero.address && submitted" class="p-error">La dirección es obligatoria</small>
      </div>
      <div class="p-field">
        <label for="reference">Referencia</label>
        <pb-InputText id="reference" v-model="paradero.reference" placeholder="Ej. Frente al Teatro" :class="{ 'p-invalid': !paradero.reference && submitted }" required />
        <small v-if="!paradero.reference && submitted" class="p-error">La referencia es obligatoria</small>
      </div>
      <div class="p-field">
        <label for="company">Empresa</label>
        <pb-Select id="company" v-model="paradero.fk_id_company" :options="companies" option-label="label" option-value="value" :class="{ 'p-invalid': !paradero.fk_id_company && submitted }" />
        <small v-if="!paradero.fk_id_company && submitted" class="p-error">La empresa es obligatoria</small>
      </div>
      <div class="p-field">
        <label for="locality">Localidad</label>
        <pb-Select id="locality" v-model="paradero.fk_id_locality" :options="localities" option-label="label" option-value="value" :class="{ 'p-invalid': !paradero.fk_id_locality && submitted }" />
        <small v-if="!paradero.fk_id_locality && submitted" class="p-error">La localidad es obligatoria</small>
      </div>
      <pb-Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="visible = false" />
      <pb-Button label="Guardar Cambios" icon="pi pi-check" type="submit" :disabled="!isFormValid || !hasChanges || submitted" />
    </pb-Form>
  </pb-Dialog>

</template>

<style scoped>
.edit-button{
  background-color: #478BFF;
  border-color: transparent;
}

.edit-button.p-button:hover{
  background-color: lightblue;
  border-color: transparent;
}



</style>
<script>
export default {
  name: "routes-alpha-filter",

  emits: ['buscar', 'borrar'],

  data() {
    return {
      selectedRegion: null,
      selectedProvince: null,
      selectedDistrict: null,
    };
  },

  props: {
    regions: {
      type: Array,
      required: true
    },
    provinces: {
      type: Array,
      required: true
    },
    districts: {
      type: Array,
      required: true
    }
  },

  computed: {
    filteredProvinces() {
      if (!this.selectedRegion) {
        return [];
      }
      return this.provinces.filter(p => p.fkIdRegion === this.selectedRegion.id);
    },
    filteredDistricts() {
      if (!this.selectedProvince) {
        return [];
      }
      return this.districts.filter(d => d.fkIdProvince === this.selectedProvince.id);
    }
  },

  watch: {
    selectedRegion() {
      this.selectedProvince = null;
      this.selectedDistrict = null;
    },
    selectedProvince() {
      this.selectedDistrict = null;
    }
  },

  methods: {
    clearFilter() {
      this.selectedRegion = null;
      this.selectedProvince = null;
      this.selectedDistrict = null;
    },

    isEmpty() {
      return this.selectedDistrict === null;
    },

    emitBuscar() {
      if (this.selectedDistrict) {
        this.$emit('buscar', this.selectedDistrict.id);
      }
    },

    emitBorrar() {
      this.clearFilter();
      this.$emit('borrar');
    }
  }
}
</script>

<template>
  <div class="form-filter">
    <!-- Region Select -->
    <pb-IftaLabel style="--p-iftalabel-color: #B4B4B4; --p-iftalabel-focus-color:#B4B4B4">
      <pb-Select class="lol" v-model="selectedRegion" :options="regions" optionLabel="name" placeholder="Seleccione una región" inputId="region" />
      <label for="region">Región</label>
    </pb-IftaLabel>

    <!-- Province Select -->
    <pb-IftaLabel style="--p-iftalabel-color: #B4B4B4; --p-iftalabel-focus-color:#B4B4B4">
      <pb-Select class="lol" v-model="selectedProvince" :options="filteredProvinces" optionLabel="name" placeholder="Seleccione una provincia" inputId="province" :disabled="!selectedRegion" />
      <label for="province">Provincia</label>
    </pb-IftaLabel>

    <!-- District Select -->
    <pb-IftaLabel style="--p-iftalabel-color: #B4B4B4; --p-iftalabel-focus-color:#B4B4B4">
      <pb-Select class="lol" v-model="selectedDistrict" :options="filteredDistricts" optionLabel="name" placeholder="Seleccione un distrito" inputId="district" :disabled="!selectedProvince" />
      <label for="district">Distrito</label>
    </pb-IftaLabel>

    <pb-Button label="Buscar"
               icon="pi pi-search"
               class="buscar-button"
               :disabled="isEmpty()"
               @click="emitBuscar"
    />

    <pb-Button
      label="Borrar Filtro"
      icon="pi pi-trash"
      severity="danger"
      filled
      style="border: transparent; border-radius: 8px; width: 150px;"
      @click="emitBorrar"
    />
  </div>
</template>

<style scoped>

.form-filter {
  display: flex;
  flex-direction: row;

  padding-right: 1rem;
  padding-left: 1rem;

  gap: 2rem;
}

.lol{
  --p-select-border-color: #CCCCFF;
  --p-select-hover-border-color: #9b9bfd;
  --p-select-focus-border-color: #8282e8;

  --p-select-placeholder-color: #B4B4B4;

  --p-select-dropdown-color: #B4B4B4;

  border-width: 2px;

  width: 250px;
}

.buscar-button{
  --p-button-primary-hover-background: #6362e9;
  --p-button-primary-hover-border-color: transparent;


  --p-button-primary-active-background: #7A78FF;
  --p-button-primary-active-border-color: transparent;

  background-color: #7A78FF;
  border: transparent; border-radius: 8px;
  width: 150px;
}

</style>
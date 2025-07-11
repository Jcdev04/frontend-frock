<script>
import { ref } from "vue";
import { StopService } from '@/network/services/stop.service.js';
import { RegionService } from "@/geography/services/region.service.js";
import { ProvinceService } from "@/geography/services/province.service.js";
import { DistrictService } from "@/geography/services/district.service.js";

export default {
  name: "popUpNewStop",

  setup() {
    const visiblePop = ref(false);
    const selectedImage = ref(null);
    const imagePreview = ref(null);

    return {
      visiblePop,
      selectedImage,
      imagePreview
    };
  },

  emits: ['update:value', 'created'],

  data() {
    return {
      paradero: {
        name: '',
        phone: '',
        address: '',
        reference: '',
        fk_id_district: '',
        imageFile: null
      },
      submitted: false,
      isUploading: false,

      // Nuevos datos para selectores en cascada
      regions: [],
      provinces: [],
      districts: [],
      selectedRegion: null,
      selectedProvince: null,
    };
  },

  computed: {
    isFormValid() {
      return this.paradero.name &&
          this.paradero.phone &&
          this.paradero.address &&
          this.paradero.reference &&
          this.paradero.fk_id_district;
    },
  },

  watch: {
    async selectedRegion(newRegionId) {
      this.selectedProvince = null;
      this.provinces = [];
      if (newRegionId) {
        console.log('Región seleccionada ID:', newRegionId);
        const provinceService = new ProvinceService();
        this.provinces = await provinceService.getByRegion(newRegionId);
        console.log('Provincias cargadas:', this.provinces);
      }
    },
    async selectedProvince(newProvinceId) {
      this.paradero.fk_id_district = null;
      this.districts = [];
      if (newProvinceId) {
        console.log('Provincia seleccionada ID:', newProvinceId);
        const districtService = new DistrictService();
        this.districts = await districtService.getByProvince(newProvinceId);
        console.log('Distritos cargados:', this.districts);
      }
    }
  },

  methods: {
    async loadRegions() {
      try {
        const regionService = new RegionService();
        this.regions = await regionService.getAll();
      } catch (err) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al cargar regiones: ${err.message}`,
          life: 3000
        });
      }
    },

    onImageSelect(event) {
      const file = event.target.files[0];
      if (file) {
        // Validar tipo de archivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          this.$toast.add({
            severity: 'warn',
            summary: 'Archivo no válido',
            detail: 'Solo se permiten archivos JPG, PNG o GIF',
            life: 3000
          });
          return;
        }

        // Validar tamaño (máximo 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          this.$toast.add({
            severity: 'warn',
            summary: 'Archivo muy grande',
            detail: 'El archivo debe ser menor a 5MB',
            life: 3000
          });
          return;
        }

        this.selectedImage = file;
        this.paradero.imageFile = file;

        // Crear preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    removeImage() {
      this.selectedImage = null;
      this.imagePreview = null;
      this.paradero.imageFile = null;
      // Limpiar el input file
      const fileInput = this.$refs.imageInput;
      if (fileInput) {
        fileInput.value = '';
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
        this.isUploading = true;

        // Obtener companyId del localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        this.paradero.fk_id_company = user?.companyId || '';

        const service = new StopService();
        const created = await service.createStop({...this.paradero});

        this.$emit('created', created);
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Paradero creado correctamente',
          life: 3000
        });

        // Cerrar el popup y resetear formulario
        this.visiblePop = false;
        this.resetForm();

      } catch (err) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al crear paradero: ${err.message}`,
          life: 3000
        });
      } finally {
        this.isUploading = false;
      }
    },

    clearLocation() {
      this.selectedRegion = null;
      this.selectedProvince = null;
      this.paradero.fk_id_district = null;
      this.provinces = [];
      this.districts = [];
    },

    resetForm() {
      this.paradero = {
        name: '',
        phone: '',
        address: '',
        reference: '',
        fk_id_company: '',
        fk_id_district: '',
        imageFile: null
      };
      this.submitted = false;
      this.removeImage();
      this.clearLocation();
    },

    onDialogHide() {
      this.resetForm();
    }
  },

  mounted() {
    this.loadRegions();
  }
};
</script>

<template>
  <pb-Button class="nuevo-paradero-button" icon="pi pi-plus" label="Nuevo Paradero" @click="visiblePop = true"/>

  <pb-Dialog v-model:visible="visiblePop" modal :style="{ width: '60rem' }" @hide="onDialogHide">
    <template #header>
      <h1 class="title">Nuevo Paradero</h1>
    </template>

    <pb-Form @submit="createStop">
      <div class="form-container">

        <!-- Campo de Nombre -->
        <pb-IftaLabel class="labelSelectField">
          <label for="name">Nombre</label>
          <pb-InputText id="name" v-model="paradero.name" class="input-field" />
        </pb-IftaLabel>

        <!-- Campo de Teléfono -->
        <pb-IftaLabel class="labelSelectField">
          <label for="phone">Teléfono</label>
          <pb-InputText id="phone" v-model="paradero.phone" class="input-field"/>
        </pb-IftaLabel>

        <!-- Campo de Dirección -->
        <pb-IftaLabel class="labelSelectField">
          <label for="address">Dirección</label>
          <pb-InputText id="address" v-model="paradero.address" placeholder="Ej: Av. Norte 789" class="input-field"/>
        </pb-IftaLabel>

        <!-- Campo de Referencia -->
        <pb-IftaLabel class="labelSelectField">
          <label for="reference">Referencia</label>
          <pb-InputText id="reference" v-model="paradero.reference" placeholder="Ej: Frente al Teatro" class="input-field"/>
        </pb-IftaLabel>

        <!-- Selectores de Ubicación -->
        <div class="location-selectors-container">
          <pb-IftaLabel class="labelSelectField flex-grow-1">
            <pb-Select
                v-model="selectedRegion"
                :options="regions"
                optionLabel="name"
                optionValue="id"
                placeholder="Región"
                class="input-field"
            />
            <label>Región</label>
          </pb-IftaLabel>

          <pb-IftaLabel class="labelSelectField flex-grow-1">
            <pb-Select
                v-model="selectedProvince"
                :options="provinces"
                optionLabel="name"
                optionValue="id"
                placeholder="Provincia"
                :disabled="!selectedRegion || provinces.length === 0"
                class="input-field"
            />
            <label>Provincia</label>
          </pb-IftaLabel>

          <pb-IftaLabel class="labelSelectField flex-grow-1">
            <pb-Select
                v-model="paradero.fk_id_district"
                :options="districts"
                optionLabel="name"
                optionValue="id"
                placeholder="Distrito"
                :disabled="!selectedProvince || districts.length === 0"
                class="input-field"
            />
            <label>Distrito</label>
          </pb-IftaLabel>

          <pb-Button
              icon="pi pi-trash"
              severity="danger"
              @click="clearLocation"
              type="button"
              class="clear-location-button"
          />
        </div>

        <!-- Campo de Imagen -->
        <div class="image-upload-section">
          <label class="image-upload-label">Imagen del Paradero (Opcional)</label>

          <!-- Input de archivo oculto -->
          <input
              ref="imageInput"
              type="file"
              accept="image/*"
              @change="onImageSelect"
              style="display: none"
          />

          <!-- Botón para seleccionar imagen -->
          <pb-Button
              v-if="!selectedImage"
              type="button"
              label="Seleccionar Imagen"
              icon="pi pi-upload"
              class="image-select-button"
              @click="$refs.imageInput.click()"
          />

          <!-- Preview de la imagen -->
          <div v-if="imagePreview" class="image-preview-container">
            <img :src="imagePreview" alt="Preview" class="image-preview" />
            <pb-Button
                type="button"
                icon="pi pi-times"
                class="remove-image-button"
                @click="removeImage"
                severity="danger"
                size="small"
            />
          </div>

          <!-- Información sobre el archivo -->
          <div v-if="selectedImage" class="file-info">
            <small>{{ selectedImage.name }} ({{ Math.round(selectedImage.size / 1024) }} KB)</small>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="button-container">
          <pb-Button
              label="Cancelar"
              icon="pi pi-times"
              class="cancel-button"
              type="button"
              @click="visiblePop = false"
          />
          <pb-Button
              :label="isUploading ? 'Creando...' : 'Crear'"
              :icon="isUploading ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
              class="create-button"
              type="submit"
              :disabled="(!isFormValid && !submitted) || isUploading"
          />
        </div>
      </div>
    </pb-Form>
  </pb-Dialog>
</template>

<style scoped>
.location-selectors-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.clear-location-button {
  height: 42px; /* Alinea la altura con los inputs */
  width: 42px;
  flex-shrink: 0;
}

.input-field{
  --p-select-border-color: #CCCCFF;
  --p-select-hover-border-color: #9b9bfd;
  --p-select-focus-border-color: #8282e8;

  --p-select-placeholder-color: #B4B4B4;

  --p-select-dropdown-color: #B4B4B4;
}

.cascade-field {
  border-color: var(--color-off);
  --p-cascadeselect-focus-border-color: var(--color-primary);
  max-height: 200px;
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

.image-upload-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.image-upload-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-slate-400);
}

.image-select-button {
  background-color: #f8f9fa;
  border: 2px dashed var(--color-off);
  color: #5a5ad7; /* Color base para el icono y texto */
  padding: 20px;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s; /* Transición suave */
  font-weight: 500;
}

.image-select-button:hover.p-button:hover {
  --p-button-primary-hover-background: #f0f4ff; /* Color de fondo sutil al pasar el mouse */
  --p-button-primary-hover-color: #3c3cb7; /* Color del texto al pasar el mouse */
  border: 2px dashed var(--color-off);

  --p-button-primary-hover-border-color: var(--color-off); /* Mantiene el color del borde original */
}

.image-select-button.p-button:active {
  background-color: #e0e7ff; /* Tono más oscuro para el estado active */
  border: 2px dashed var(--color-off); /* Mantiene el borde igual */
}

.image-preview-container {
  position: relative;
  display: inline-block;
  max-width: 200px;
}

.image-preview {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  border: 2px solid var(--color-off);
}

.remove-image-button {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 0;
  min-width: 24px;
}

.file-info {
  color: var(--color-slate-400);
  font-size: 12px;
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
  opacity: 0.6;
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
  display: flex;
  align-items: center;
  background-color: var(--color-primary);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  max-height: 40px;
  height: 100%;
  max-width: 200px;
  width: 100%;
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
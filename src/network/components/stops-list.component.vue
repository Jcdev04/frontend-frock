<script>
import { StopService } from '@/network/services/stop.service.js';

export default {
  name: "StopsList",

  props: {
    stops: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },

  emits: ['updated', 'deleted'],

  data() {
    return {
      selectedStop: null,
      showEditDialog: false,
      showDeleteDialog: false,
      showImageDialog: false,
      selectedImage: null,
      editForm: {
        id: null,
        name: '',
        phone: '',
        address: '',
        reference: '',
        fk_id_district: ''
      },
      isUpdating: false,
      isDeleting: false
    };
  },

  methods: {
    openEditDialog(stop) {
      this.selectedStop = stop;
      this.editForm = {
        id: stop.id,
        name: stop.name,
        phone: stop.phone,
        address: stop.address,
        reference: stop.reference,
        fk_id_district: stop.fkIdDistrict
      };
      this.showEditDialog = true;
    },

    openDeleteDialog(stop) {
      this.selectedStop = stop;
      this.showDeleteDialog = true;
    },

    openImageDialog(imageUrl) {
      this.selectedImage = imageUrl;
      this.showImageDialog = true;
    },

    async updateStop() {
      if (!this.selectedStop) return;

      try {
        this.isUpdating = true;
        const service = new StopService();
        await service.updateStop(this.selectedStop.id, this.editForm);

        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Paradero actualizado correctamente',
          life: 3000
        });

        this.showEditDialog = false;
        this.$emit('updated');
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al actualizar: ${error.message}`,
          life: 3000
        });
      } finally {
        this.isUpdating = false;
      }
    },

    async deleteStop() {
      if (!this.selectedStop) return;

      try {
        this.isDeleting = true;
        const service = new StopService();
        await service.deleteStop(this.selectedStop.id);

        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Paradero eliminado correctamente',
          life: 3000
        });

        this.showDeleteDialog = false;
        this.$emit('deleted');
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al eliminar: ${error.message}`,
          life: 3000
        });
      } finally {
        this.isDeleting = false;
      }
    },

    getImageUrl(stop) {
      return stop.imageUrl && stop.imageUrl !== 'null' && stop.imageUrl !== ''
          ? stop.imageUrl
          : null;
    },

    hasImage(stop) {
      const imageUrl = this.getImageUrl(stop);
      return imageUrl !== null;
    }
  }
};
</script>

<template>
  <div class="stops-list-container">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <pb-ProgressSpinner />
      <p>Cargando paraderos...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <pb-Message severity="error" :closable="false">
        {{ error }}
      </pb-Message>
    </div>

    <!-- Empty State -->
    <div v-else-if="!stops || stops.length === 0" class="empty-container">
      <pb-Message severity="info" :closable="false">
        No hay paraderos registrados. ¡Crea tu primer paradero!
      </pb-Message>
    </div>

    <!-- Stops List -->
    <div v-else class="stops-grid">
      <pb-Card v-for="stop in stops" :key="stop.id" class="stop-card">
        <template #header>
          <div class="card-header">
            <!-- Imagen del paradero -->
            <div class="image-container">
              <img
                  v-if="hasImage(stop)"
                  :src="getImageUrl(stop)"
                  :alt="stop.name"
                  class="stop-image"
                  @click="openImageDialog(getImageUrl(stop))"
              />
              <div v-else class="no-image-placeholder">
                <i class="pi pi-image" style="font-size: 2rem; color: #ccc;"></i>
                <span>Sin imagen</span>
              </div>
            </div>
          </div>
        </template>

        <template #title>
          <div class="stop-title">
            <h3>{{ stop.name }}</h3>
            <div class="action-buttons">
              <pb-Button
                  icon="pi pi-pencil"
                  class="edit-button"
                  @click="openEditDialog(stop)"
                  size="small"
                  text
              />
              <pb-Button
                  icon="pi pi-trash"
                  class="delete-button"
                  @click="openDeleteDialog(stop)"
                  size="small"
                  text
                  severity="danger"
              />
            </div>
          </div>
        </template>

        <template #content>
          <div class="stop-details">
            <div class="detail-item">
              <i class="pi pi-phone"></i>
              <span>{{ stop.phone }}</span>
            </div>

            <div class="detail-item">
              <i class="pi pi-map-marker"></i>
              <span>{{ stop.address }}</span>
            </div>

            <div class="detail-item">
              <i class="pi pi-info-circle"></i>
              <span>{{ stop.reference }}</span>
            </div>

            <div v-if="stop.location" class="detail-item">
              <i class="pi pi-globe"></i>
              <span>{{ stop.location }}</span>
            </div>
          </div>
        </template>
      </pb-Card>
    </div>

    <!-- Edit Dialog -->
    <pb-Dialog v-model:visible="showEditDialog" modal header="Editar Paradero" :style="{ width: '40rem' }">
      <div class="edit-form">
        <div class="form-field">
          <label for="edit-name">Nombre</label>
          <pb-InputText id="edit-name" v-model="editForm.name" class="w-full" />
        </div>

        <div class="form-field">
          <label for="edit-phone">Teléfono</label>
          <pb-InputText id="edit-phone" v-model="editForm.phone" class="w-full" />
        </div>

        <div class="form-field">
          <label for="edit-address">Dirección</label>
          <pb-InputText id="edit-address" v-model="editForm.address" class="w-full" />
        </div>

        <div class="form-field">
          <label for="edit-reference">Referencia</label>
          <pb-InputText id="edit-reference" v-model="editForm.reference" class="w-full" />
        </div>
      </div>

      <template #footer>
        <pb-Button
            label="Cancelar"
            icon="pi pi-times"
            @click="showEditDialog = false"
            class="p-button-text"
        />
        <pb-Button
            :label="isUpdating ? 'Actualizando...' : 'Actualizar'"
            :icon="isUpdating ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
            @click="updateStop"
            :disabled="isUpdating"
        />
      </template>
    </pb-Dialog>

    <!-- Delete Confirmation Dialog -->
    <pb-Dialog v-model:visible="showDeleteDialog" modal header="Confirmar Eliminación" :style="{ width: '30rem' }">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: #f59e0b;"></i>
        <span>¿Estás seguro de que deseas eliminar el paradero <strong>{{ selectedStop?.name }}</strong>?</span>
      </div>

      <template #footer>
        <pb-Button
            label="Cancelar"
            icon="pi pi-times"
            @click="showDeleteDialog = false"
            class="p-button-text"
        />
        <pb-Button
            :label="isDeleting ? 'Eliminando...' : 'Eliminar'"
            :icon="isDeleting ? 'pi pi-spin pi-spinner' : 'pi pi-trash'"
            @click="deleteStop"
            severity="danger"
            :disabled="isDeleting"
        />
      </template>
    </pb-Dialog>

    <!-- Image Preview Dialog -->
    <pb-Dialog v-model:visible="showImageDialog" modal header="Imagen del Paradero" :style="{ width: '50rem' }">
      <div class="image-preview-dialog">
        <img :src="selectedImage" alt="Imagen del paradero" class="full-image" />
      </div>
    </pb-Dialog>
  </div>
</template>

<style scoped>
.stops-list-container {
  padding: 20px;
}

.loading-container, .error-container, .empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.stops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stop-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.stop-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  position: relative;
}

.image-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
}

.stop-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.stop-image:hover {
  transform: scale(1.05);
}

.no-image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #9ca3af;
}

.stop-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.stop-title h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: 1.2rem;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.edit-button {
  color: #3b82f6;
}

.delete-button {
  color: #ef4444;
}

.stop-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #6b7280;
}

.detail-item i {
  width: 16px;
  color: var(--color-primary);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-field label {
  font-weight: 500;
  color: #374151;
}

.confirmation-content {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 0;
}

.image-preview-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.full-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .stops-grid {
    grid-template-columns: 1fr;
  }

  .stop-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
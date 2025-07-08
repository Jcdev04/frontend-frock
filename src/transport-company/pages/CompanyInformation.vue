<script>
import { TransportCompanyService } from "@/transport-company/services/transport-company.service.js";

export default {
  name: "CompanyInformation",
  data() {
    return {
      company: {
        id: null,
        name: '',
        imgUrl: '',
        userId: null,
      },
      editDialogVisible: false,
      editedCompanyName: '',
      isSaving: false,
      transportCompanyService: new TransportCompanyService(),
    };
  },
  computed: {
    isSaveButtonDisabled() {
      return !this.editedCompanyName || this.editedCompanyName.trim() === '' || this.editedCompanyName === this.company.name || this.isSaving;
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.company.id = user.companyId;
      this.company.name = user.companyName;
      this.company.imgUrl = user.companyImgUrl;
      this.company.userId = user.id;
      console.log('Usuario desde localStorage:', user);
    }
  },
  methods: {
    openEditDialog() {
      this.editedCompanyName = this.company.name;
      this.editDialogVisible = true;
    },
    async handleUpdateCompany() {
      if (this.isSaveButtonDisabled) return;

      this.isSaving = true;
      try {
        const companyDataToUpdate = {
          id: this.company.userId,
          companyName: this.editedCompanyName,
          companyImgUrl: this.company.imgUrl,
        };

        const updatedCompany = await this.transportCompanyService.updateCompany(this.company.id, companyDataToUpdate);

        // Actualizar localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        user.companyName = updatedCompany.name;
        localStorage.setItem('user', JSON.stringify(user));

        this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Nombre de la empresa actualizado.', life: 3000 });
        this.editDialogVisible = false;

        // Recargar para que los cambios se reflejen en toda la app (ej. toolbar)
        window.location.reload();

      } catch (error) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el nombre.', life: 3000 });
        console.error(error);
      } finally {
        this.isSaving = false;
      }
    }
  }
};
</script>

<template>
  <div class="company-info-container">
    <pb-Card class="info-card">
      <template #title>
        <div class="card-title">
          <h2>Información de la Empresa</h2>
          <pb-Button icon="pi pi-pencil" label="Editar" @click="openEditDialog" outlined />
        </div>
      </template>
      <template #content>
        <div class="company-details">
          <pb-Image :src="company.imgUrl" alt="Logo de la empresa" width="150" preview />
          <div class="company-name">
            <h3>Nombre de la Empresa</h3>
            <p>{{ company.name }}</p>
          </div>
        </div>
      </template>
    </pb-Card>

    <pb-Dialog v-model:visible="editDialogVisible" modal header="Editar Nombre de la Empresa" :style="{ width: '30rem' }">
      <div class="dialog-content">
        <img :src="company.imgUrl" alt="Logo" class="dialog-logo" />
        <pb-IftaLabel class="labelSelectField">
          <label for="companyName">Nombre de la empresa</label>
          <pb-InputText id="companyName" v-model="editedCompanyName" class="input-field" />
        </pb-IftaLabel>
      </div>
      <template #footer>
        <pb-Button label="Cancelar" severity="secondary" @click="editDialogVisible = false" />
        <pb-Button label="Guardar" @click="handleUpdateCompany" :disabled="isSaveButtonDisabled" :loading="isSaving" />
      </template>
    </pb-Dialog>
  </div>
</template>

<style scoped>
.company-info-container {
  padding: 2rem;
}

.info-card {
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title h2 {
  margin: 0;
  color: var(--color-primary);
}

.company-details {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.company-name h3 {
  margin: 0 0 0.5rem 0;
  color: var(--color-slate-400);
  font-size: 1rem;
}

.company-name p {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
}

.dialog-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-off);
}

.labelSelectField {
  width: 100%;
}

.input-field {
  width: 100%;
}
</style>
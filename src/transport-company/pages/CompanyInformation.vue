<template>
  <div class="company-information-container">
    <main class="main-content">
      <h1 class="page-title">Información de la Empresa</h1>
      <p class="page-subtitle">Gestiona y actualiza la información de tu empresa de transporte</p>

      <div class="form-section">
        <h2 class="section-title">Datos Generales</h2>
        <form @submit.prevent="saveCompanyInformation" class="company-form">
          <!-- Company Name -->
          <div class="form-group">
            <label for="companyName" class="form-label">
              Nombre de la Empresa <span class="required">*</span>
            </label>
            <input
                id="companyName"
                v-model="companyInfo.name"
                type="text"
                required
                class="form-input"
                placeholder="Ingrese el nombre de la empresa"
            />
          </div>

          <!-- RUC -->
          <div class="form-group">
            <label for="ruc" class="form-label">
              RUC <span class="required">*</span>
            </label>
            <input
                id="ruc"
                v-model="companyInfo.ruc"
                type="text"
                required
                maxlength="11"
                class="form-input"
                placeholder="20123456789"
            />
          </div>

          <!-- Phone -->
          <div class="form-group">
            <label for="phone" class="form-label">
              Teléfono <span class="required">*</span>
            </label>
            <input
                id="phone"
                v-model="companyInfo.phone"
                type="tel"
                required
                class="form-input"
                placeholder="+51 999 999 999"
            />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email" class="form-label">
              Email <span class="required">*</span>
            </label>
            <input
                id="email"
                v-model="companyInfo.email"
                type="email"
                required
                class="form-input"
                placeholder="empresa@ejemplo.com"
            />
          </div>

          <!-- Address -->
          <div class="form-group">
            <label for="address" class="form-label">
              Dirección <span class="required">*</span>
            </label>
            <textarea
                id="address"
                v-model="companyInfo.address"
                required
                rows="3"
                class="form-textarea"
                placeholder="Ingrese la dirección completa de la empresa"
            ></textarea>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="description" class="form-label">
              Descripción
            </label>
            <textarea
                id="description"
                v-model="companyInfo.description"
                rows="4"
                class="form-textarea"
                placeholder="Descripción de la empresa y servicios que ofrece"
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button
                type="button"
                @click="resetForm"
                class="btn btn-cancel"
            >
              Cancelar
            </button>
            <button
                type="submit"
                :disabled="isLoading"
                class="btn btn-save"
            >
              <span v-if="isLoading">
                <i class="pi pi-spin pi-spinner"></i>
                Guardando...
              </span>
              <span v-else>Guardar Información</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccessMessage" class="success-message">
        <i class="pi pi-check-circle"></i>
        Información guardada exitosamente
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {TransportCompany} from "@/transport-company/models/transport-company.entity.js";
import {TransportCompanyService} from "@/transport-company/services/transport-company.service.js";
import {TransportCompanyValidator} from "@/transport-company/services/TransportCompanyValidator.js";

const transportCompanyService = new TransportCompanyService();
const router = useRouter();

const emit = defineEmits(['success', 'error', 'cancel']);
// Reactive state
const companyInfo = reactive(new TransportCompany({}))

const isLoading = ref(false)
const showSuccessMessage = ref(false)

// Modificar la función saveCompanyInformation para redirigir después de guardar
const saveCompanyInformation = async () => {
  // 1. Validación mejorada
  const errors = TransportCompanyValidator.validate(companyInfo);

  if (errors.length > 0) {
    // Mostrar todos los errores en un solo alert con formato mejorado
    const errorList = errors.map((error, index) =>
        `• ${error}${index < errors.length - 1 ? '\n' : ''}`
    ).join('');

    alert(`❌ Error en el formulario ❌\n\nPor favor corrija los siguientes problemas:\n\n${errorList}`);
    return;
  }
  try {
    isLoading.value = true;
    // 2. Creación de entidad con validación
    const companyData = new TransportCompany({
      ...companyInfo,
      id: "comp-1" // Mejor práctica: ID debería venir del estado o props
    });

    // 3. Llamada al servicio con manejo de errores específico
    await transportCompanyService.updateTransportCompany("comp-1", companyData);

    // 4. Feedback al usuario mejorado
    showSuccessMessage.value = true;

  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

// Resetear formulario
const resetForm = () => {
  loadCompanyInformation();
  emit('cancel');
};

//cargar la informacion en el formulario
const loadCompanyInformation = async () => {
  try {
    const companyData = await transportCompanyService.getTransportCompanyById("comp-1");
    // Actualizar el estado reactivo
    Object.assign(companyInfo, {
      name: companyData.name,
      logo_url: companyData.logo_url,
      ruc: companyData.ruc,
      phone: companyData.phone,
      email: companyData.email,
      address: companyData.address,
      description: companyData.description
    });
  } catch (error) {
    console.error('Error al cargar la información:', error)
  }finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadCompanyInformation()
})


</script>

<style scoped>
/* Base Styles */
.company-information-container {
  color: #333;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}



/* Page Title */
.page-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.page-subtitle {
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

/* Form Section */
.form-section {
  background-color: white;
  border-radius: 4px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

/* Form Elements */
.company-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}

.required {
  color: #e53935;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.form-input:focus, .form-textarea:focus {
  border-color: #0066cc;
  outline: none;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}


/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-cancel {
  background-color: white;
  color: #666;
  border: 1px solid #ccc;
}

.btn-cancel:hover {
  background-color: #f5f5f5;
}

.btn-save {
  background-color: #0066cc;
  color: white;
}

.btn-save:hover {
  background-color: #0055aa;
}

.btn-save:disabled {
  background-color: #99ccff;
  cursor: not-allowed;
}

/* Success Message */
.success-message {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #4caf50;
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
  z-index: 1000;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
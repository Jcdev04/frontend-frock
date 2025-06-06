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

          <!-- Operating Hours -->
          <div class="form-group">
            <h3 class="subsection-title">Horarios de Operación</h3>

            <div class="time-group">
              <label for="startTime" class="form-label">
                Hora de Inicio
              </label>
              <div class="time-input-wrapper">
                <input
                    id="startTime"
                    v-model="companyInfo.operatingHours.start"
                    type="time"
                    class="form-input time-input"
                />
                <i class="pi pi-clock time-icon"></i>
              </div>
            </div>

            <div class="time-group">
              <label for="endTime" class="form-label">
                Hora de Fin
              </label>
              <div class="time-input-wrapper">
                <input
                    id="endTime"
                    v-model="companyInfo.operatingHours.end"
                    type="time"
                    class="form-input time-input"
                />
                <i class="pi pi-clock time-icon"></i>
              </div>
            </div>
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
// Importar useRouter al inicio del script setup
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Agregar la instancia del router después de las importaciones
const router = useRouter()

// Domain Models (DDD)
class CompanyInformation {
  constructor(data = {}) {
    this.name = data.name || ''
    this.ruc = data.ruc || ''
    this.phone = data.phone || ''
    this.email = data.email || ''
    this.address = data.address || ''
    this.description = data.description || ''
    this.operatingHours = {
      start: data.operatingHours?.start || '',
      end: data.operatingHours?.end || ''
    }
    this.lastUpdated = data.lastUpdated || new Date()
  }

  validate() {
    const errors = []
    if (!this.name.trim()) errors.push('El nombre de la empresa es requerido')
    if (!this.ruc.trim()) errors.push('El RUC es requerido')
    if (this.ruc.length !== 11) errors.push('El RUC debe tener 11 dígitos')
    if (!this.phone.trim()) errors.push('El teléfono es requerido')
    if (!this.email.trim()) errors.push('El email es requerido')
    if (!this.address.trim()) errors.push('La dirección es requerida')
    return errors
  }
}

// Domain Service
class CompanyInformationService {
  static async save(companyInfo) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('companyInformation', JSON.stringify(companyInfo))
        resolve(companyInfo)
      }, 1000)
    })
  }

  static async load() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = localStorage.getItem('companyInformation')
        resolve(saved ? JSON.parse(saved) : null)
      }, 500)
    })
  }
}

// Reactive state
const companyInfo = reactive(new CompanyInformation())
const isLoading = ref(false)
const showSuccessMessage = ref(false)

// Modificar la función saveCompanyInformation para redirigir después de guardar
const saveCompanyInformation = async () => {
  const errors = companyInfo.validate()
  if (errors.length > 0) {
    alert('Por favor, corrija los siguientes errores:\n' + errors.join('\n'))
    return
  }

  isLoading.value = true

  try {
    const companyData = new CompanyInformation({
      ...companyInfo,
      lastUpdated: new Date()
    })

    await CompanyInformationService.save(companyData)

    showSuccessMessage.value = true

    // Esperar un momento para mostrar el mensaje de éxito antes de redirigir
    setTimeout(() => {
      showSuccessMessage.value = false
      // Redirigir a la página principal de la empresa
      router.push('/company/home')
    }, 1500)
  } catch (error) {
    alert('Error al guardar la información: ' + error.message)
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  Object.assign(companyInfo, new CompanyInformation())
}

const loadCompanyInformation = async () => {
  try {
    const saved = await CompanyInformationService.load()
    if (saved) {
      Object.assign(companyInfo, saved)
    }
  } catch (error) {
    console.error('Error al cargar la información:', error)
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
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.router-link-active {
  color: #0066cc;
}

.profile {
  display: flex;
  align-items: center;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

/* Breadcrumbs */
.breadcrumbs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
}

.breadcrumb-link {
  color: #0066cc;
  text-decoration: none;
}

.breadcrumb-link:after {
  content: '>';
  margin-left: 0.5rem;
  color: #999;
}

.breadcrumb-current {
  color: #666;
}

/* User Info */
.user-info {
  margin-bottom: 1.5rem;
}

.user-avatar {
  width: 30px;
  height: 30px;
  background-color: #ff9800;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
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

.subsection-title {
  font-size: 1rem;
  font-weight: bold;
  margin: 1.5rem 0 1rem;
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

/* Time Inputs */
.time-group {
  margin-bottom: 1rem;
}

.time-input-wrapper {
  position: relative;
}

.time-input {
  padding-right: 2.5rem;
}

.time-icon {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
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
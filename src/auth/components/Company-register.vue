<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="title">Empresa</h2>
      <p class="subtitle">Ingresa la información de su empresa</p>

      <form @submit.prevent="handleCompanyRegister">
        <div class="logo-upload-container">
          <div class="logo-upload" @click="triggerFileInput">
            <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                accept="image/*"
                style="display: none"
            />
            <div v-if="!previewImage" class="upload-placeholder">
              <span class="upload-icon">📷</span>
              <span>Suba el logo de su empresa</span>
            </div>
            <img v-else :src="previewImage" alt="Logo preview" class="preview-image" />
          </div>
        </div>

        <div class="form-group">
          <input
              type="text"
              v-model="companyName"
              placeholder="Nombre de su empresa"
              class="form-input"
              required
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Procesando...' : 'Continuar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyRegisterView',
  data() {
    return {
      companyName: '',
      companyLogo: null,
      previewImage: null,
      error: null,
      isLoading: false
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.companyLogo = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },
    async handleCompanyRegister() {
      if (!this.companyName) {
        this.error = 'Por favor ingrese el nombre de su empresa';
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        // Aquí iría la lógica real para guardar la información de la empresa
        // Por ahora, simulamos un proceso exitoso

        // Simulación de una llamada a API (reemplazar con tu lógica real)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Guardar información de la empresa (simulado)
        const companyInfo = {
          name: this.companyName,
          logoUrl: this.previewImage // En una implementación real, esto sería la URL del logo subido al servidor
        };

        // Guardar en localStorage para simular persistencia
        localStorage.setItem('company_info', JSON.stringify(companyInfo));

        // Asegurarse de que el token de autenticación esté establecido
        if (!localStorage.getItem('auth_token')) {
          localStorage.setItem('auth_token', 'ejemplo_token_jwt');
        }

        // Emitir evento de registro exitoso
        this.$emit('register-success');

        // Redireccionar a la página principal donde se muestra el toolbar
        this.$router.push('/rutas');
      } catch (error) {
        console.error('Error al registrar empresa:', error);
        this.error = 'Ocurrió un error al registrar la empresa';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.logo-upload-container {
  margin-bottom: 1.5rem;
}

.logo-upload {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.form-group {
  margin-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.error-message {
  color: #e53935;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: left;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.btn-primary:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>
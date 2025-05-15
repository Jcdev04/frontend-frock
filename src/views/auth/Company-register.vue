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
          />
        </div>

        <button type="submit" class="btn-primary">
          Continuar
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
      previewImage: null
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
    handleCompanyRegister() {
      // Solo navegación, sin lógica de backend
      this.$router.push('/');
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
</style>
<template>
  <div class="ruta-card">
    <div class="paraderos">
      <div class="paradero">
        <div class="paradero-icon"></div>
        <span class="paradero-label">{{ ruta.origenNombre || 'Paradero origen' }}</span>
      </div>

      <div class="bus-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 6v6"></path>
          <path d="M15 6v6"></path>
          <path d="M2 12h19.6"></path>
          <path d="M18 18h3"></path>
          <path d="M2 7h18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"></path>
        </svg>
      </div>

      <div class="paradero">
        <div class="paradero-icon"></div>
        <span class="paradero-label">{{ ruta.destinoNombre || 'Paradero destino' }}</span>
      </div>
    </div>

    <div class="info-section">
      <div class="info-row">
        <div class="info-icon-container">
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 22h14"></path>
              <path d="M5 2h14"></path>
              <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
              <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="info-row">
        <div class="info-label-container">
          <span class="info-label">Duración</span>
          <span class="info-label">Tarifa</span>
          <span class="info-label">Frecuencia</span>
        </div>
      </div>

      <div class="info-row">
        <div class="info-value-container">
          <span class="info-value">{{ ruta.duracion }} min</span>
          <span class="info-value">s/. {{ ruta.tarifa }}</span>
          <span class="info-value">c/ {{ ruta.frecuencia }} min</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RutaCard',
  props: {
    ruta: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.ruta-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.paraderos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.paradero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80px;
}

.paradero-icon {
  width: 60px;
  height: 60px;
  background-color: #E8E0E8;
  border-radius: 50%;
  margin-bottom: 12px;
}

.paradero-label {
  font-size: 13px;
  color: #000000;
  font-weight: 500;
}

.bus-icon {
  color: #7A78FF;
  margin: 0 10px;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: center;
}

.info-icon-container, .info-label-container, .info-value-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
}

.info-icon {
  color: #000000;
  display: flex;
  justify-content: center;
  width: 33.33%;
}

.info-label {
  font-size: 13px;
  color: #000000;
  text-align: center;
  width: 33.33%;
}

.info-value {
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  text-align: center;
  width: 33.33%;
}
</style>
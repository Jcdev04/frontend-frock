<template>
  <div class="ruta-card">
    <div class="paraderos">
      <div class="paradero">
        <div class="paradero-icon"></div>
        <span class="paradero-label">Paradero origen</span>
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
        <span class="paradero-label">Paradero destino</span>
      </div>
    </div>

    <div class="ruta-info">
      <div class="info-item">
        <div class="info-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <span class="info-label">Duración</span>
        <span class="info-value">{{ ruta.duracion }} min</span>
      </div>

      <div class="info-item">
        <div class="info-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <span class="info-label">Tarifa</span>
        <span class="info-value">s/. {{ ruta.tarifa }}</span>
      </div>

      <div class="info-item">
        <div class="info-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 22h14"></path>
            <path d="M5 2h14"></path>
            <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
            <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
          </svg>
        </div>
        <span class="info-label">Frecuencia</span>
        <span class="info-value">c/ {{ ruta.frecuencia }} min</span>
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
  padding: 20px;
  background-color: white;
  width: 300px;
  flex-shrink: 0;
}

.paraderos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.paradero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.paradero-icon {
  width: 50px;
  height: 50px;
  background-color: #E8E0E8;
  border-radius: 50%;
  margin-bottom: 8px;
}

.paradero-label {
  font-size: 12px;
  color: #000000;
}

.bus-icon {
  color: #7A78FF;
}

.ruta-info {
  display: flex;
  justify-content: space-between;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.info-icon {
  margin-bottom: 4px;
  color: #000000;
}

.info-label {
  font-size: 12px;
  color: #000000;
  margin-bottom: 4px;
}

.info-value {
  font-size: 14px;
  font-weight: 600;
  color: #000000;
}
</style>
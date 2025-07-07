<script>
import popUpNewStop from "@/network/components/stop-popUps/new-stop-popup.component.vue";

export default {
  name: "StopsHeaderTitle",
  components: {
    popUpNewStop
  },

  emits: ['created'],

  methods: {
    handleStopCreated(newStop) {
      this.$emit('created', newStop);
    }
  }
};
</script>

<template>
  <div class="stops-header">
    <div class="header-content">
      <div class="title-section">
        <h1 class="page-title">Gestión de Paraderos</h1>
        <p class="page-subtitle">Administra los puntos de parada de tu empresa</p>
      </div>

      <div class="actions-section">
        <pop-up-new-stop @created="handleStopCreated" />
      </div>
    </div>

    <div class="stats-section">
      <div class="stat-card">
        <i class="pi pi-map-marker"></i>
        <div class="stat-info">
          <span class="stat-number">{{ $parent.stops?.length || 0 }}</span>
          <span class="stat-label">Paraderos Activos</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stops-header {
  background: linear-gradient(135deg, var(--color-primary) 0%, #2563eb 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title-section {
  flex: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: white;
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.actions-section {
  display: flex;
  gap: 15px;
  align-items: center;
}

.stats-section {
  display: flex;
  gap: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.stat-card i {
  font-size: 1.5rem;
  opacity: 0.8;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .stats-section {
    justify-content: center;
  }
}
</style>
<template>
  <div class="rutas-container">
    <div class="rutas-header">
      <h1 class="rutas-title">Rutas</h1>
      <button class="nuevo-paradero-btn" @click="abrirModalNuevoParadero">
        <span class="plus-icon">+</span> Nuevo Paradero
      </button>
    </div>

    <div class="rutas-grid">
      <ruta-card
          v-for="ruta in rutas"
          :key="ruta.id"
          :ruta="ruta"
      />
    </div>
  </div>
</template>

<script>
import RutaCard from '../components/RutaCard.vue';
import { RutaService } from '../../application/services/RutaService';

export default {
  name: 'RutasView',
  components: {
    RutaCard
  },
  data() {
    return {
      rutas: [],
      rutaService: new RutaService()
    }
  },
  created() {
    this.cargarRutas();
  },
  methods: {
    async cargarRutas() {
      try {
        this.rutas = await this.rutaService.obtenerRutas();
      } catch (error) {
        console.error('Error al cargar rutas:', error);
      }
    },
    abrirModalNuevoParadero() {
      // Implementar lógica para abrir modal de nuevo paradero
      console.log('Abrir modal de nuevo paradero');
    }
  }
}
</script>

<style scoped>
.rutas-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: white;
}

.rutas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.rutas-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.nuevo-paradero-btn {
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.plus-icon {
  margin-right: 4px;
}

.rutas-grid {
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow-x: auto;
}
</style>
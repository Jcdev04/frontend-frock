<template>
  <div class="rutas-container">
    <div class="rutas-header">
      <h1 class="rutas-title">Rutas</h1>
      <button class="nuevo-paradero-btn" @click="abrirModalNuevaRuta">
        <span class="plus-icon">+</span>Agregar ruta
      </button>
    </div>

    <div class="rutas-grid">
      <ruta-card
          v-for="ruta in rutas"
          :key="ruta.id"
          :ruta="ruta"
      />
    </div>

    <!-- Modal para nueva ruta -->
    <PopUpCreateRoute
        :visible="modalVisible"
        @cerrar="cerrarModal"
        @agregar="agregarNuevaRuta"
    />
  </div>
</template>

<script>
import RouteCard from '../components/RouteCard.vue';
import { RouteService } from '../services/route.service.js';
import PopUpCreateRoute from "@/company-management/components/PopUpCreateRoute.vue";

export default {
  name: 'RoutesPage',
  components: {
    PopUpCreateRoute,
    RutaCard: RouteCard,
    CreateRoutePopUp: PopUpCreateRoute
  },
  data() {
    return {
      rutas: [],
      rutaService: new RouteService(),
      modalVisible: false
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
    abrirModalNuevaRuta() {
      this.modalVisible = true;
    },
    cerrarModal() {
      this.modalVisible = false;
    },
    async agregarNuevaRuta(rutaData) {
      try {
        await this.rutaService.crearRuta(rutaData);
        await this.cargarRutas();
      } catch (error) {
        console.error('Error al agregar nueva ruta:', error);
      }
    }
  }
}
</script>

<style scoped>


.rutas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.rutas-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.nuevo-paradero-btn {
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.plus-icon {
  margin-right: 6px;
}

.rutas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

/* Responsive para tablets */
@media (max-width: 1200px) {
  .rutas-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }
}

@media (max-width: 992px) {
  .rutas-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* Responsive para móviles */
@media (max-width: 640px) {
  .rutas-grid {
    grid-template-columns: 1fr;
  }

  .rutas-container {
    padding: 20px;
  }
}
</style>
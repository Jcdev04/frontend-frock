<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Nueva Ruta</h2>
        <button class="close-button" @click="cerrarModal">×</button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="agregarRuta">
          <div class="form-group">
            <label for="origenNombre">Paradero origen</label>
            <input
                type="text"
                id="origenNombre"
                v-model="nuevaRuta.origenNombre"
                placeholder="Nombre del paradero de origen"
                required
            >
          </div>

          <div class="form-group">
            <label for="destinoNombre">Paradero destino</label>
            <input
                type="text"
                id="destinoNombre"
                v-model="nuevaRuta.destinoNombre"
                placeholder="Nombre del paradero de destino"
                required
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="duracion">Duración (min)</label>
              <input
                  type="number"
                  id="duracion"
                  v-model="nuevaRuta.duracion"
                  min="1"
                  required
              >
            </div>

            <div class="form-group">
              <label for="tarifa">Tarifa (s/.)</label>
              <input
                  type="number"
                  id="tarifa"
                  v-model="nuevaRuta.tarifa"
                  min="0.5"
                  step="0.5"
                  required
              >
            </div>

            <div class="form-group">
              <label for="frecuencia">Frecuencia (min)</label>
              <input
                  type="number"
                  id="frecuencia"
                  v-model="nuevaRuta.frecuencia"
                  min="1"
                  required
              >
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancelar" @click="cerrarModal">Cancelar</button>
            <button type="submit" class="btn-agregar">Añadir</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuevaRutaModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nuevaRuta: {
        origenNombre: '',
        destinoNombre: '',
        duracion: 20,
        tarifa: 8,
        frecuencia: 20
      }
    }
  },
  methods: {
    cerrarModal() {
      this.$emit('cerrar');
    },
    agregarRuta() {
      // Crear un objeto con los datos de la nueva ruta
      const rutaData = {
        origenId: Date.now(), // Simulamos un ID único
        destinoId: Date.now() + 1, // Simulamos otro ID único
        duracion: parseInt(this.nuevaRuta.duracion),
        tarifa: parseFloat(this.nuevaRuta.tarifa),
        frecuencia: parseInt(this.nuevaRuta.frecuencia),
        // Añadimos los nombres para mostrarlos en la UI
        origenNombre: this.nuevaRuta.origenNombre,
        destinoNombre: this.nuevaRuta.destinoNombre
      };

      // Emitir evento con los datos de la nueva ruta
      this.$emit('agregar', rutaData);

      // Resetear el formulario
      this.nuevaRuta = {
        origenNombre: '',
        destinoNombre: '',
        duracion: 20,
        tarifa: 8,
        frecuencia: 20
      };
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.btn-cancelar, .btn-agregar {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.btn-cancelar {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #333;
}

.btn-agregar {
  background-color: #333;
  border: 1px solid #333;
  color: white;
}
</style>
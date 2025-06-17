<script>
import { ref } from "vue"; //principalmente lo usamos para el atributo visible del button

export default {
  name: 'PopUpCreateRoute',
  setup() {
    const visiblePop = ref(false); //variable visible que controlara la aparicion del popUp
    return { visiblePop };
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

<template>
  <pb-Button class="nueva-ruta-button" icon="pi pi-plus" label="Nueva ruta" @click="visiblePop = true"/>
  <pb-Dialog v-model:visible="visiblePop" modal :style="{ width: '50rem' }">
      <template #header>
        <h1 class="title">Nueva Ruta</h1>
      </template>
      <pb-Form @submit.prevent="agregarRuta">
        <div class="form-container">
          <div class="form-group">
            <label for="origenNombre">StopEntity origen</label>
            <input
                type="text"
                id="origenNombre"
                v-model="nuevaRuta.origenNombre"
                placeholder="Nombre del paradero de origen"
                required
            >
          </div>

          <div class="form-group">
            <label for="destinoNombre">StopEntity destino</label>
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
          </div>
        </pb-Form>
  </pb-Dialog>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.title{
  color: var(--color-primary);
  border-bottom: var(--color-primary) solid 1px;
  padding: 10px;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
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

.nueva-ruta-button{
  /*Flex para centrar*/
  display: flex;
  align-items: center;

  /*Button en si*/
  background-color: var(--color-primary);

  border: none;
  border-radius: 8px;

  padding: 8px 16px;

  max-height: 40px;
  height: 100%;

  max-width: 200px;
  width: 100%;

  /*Text Format*/
  font-size: 16px;
  font-family: Poppins, sans-serif;
  color: var(--color-white);
}

.nueva-ruta-button.p-button:hover{
  cursor: pointer;
  background-color: var(--color-off);
  color: var(--color-white);
  border: none;
}

</style>
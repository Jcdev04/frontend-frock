<script setup>

import KPICard from "@/views/inicio/KPICard.vue";
import {CurrencyDollarIcon} from "@heroicons/vue/24/solid/index.js";
import {MapPinIcon} from "@heroicons/vue/24/solid/index.js";
import {StopCircleIcon} from "@heroicons/vue/24/solid/index.js";
import {ClockIcon} from "@heroicons/vue/24/solid/index.js";
import {ArrowRightIcon} from "@heroicons/vue/16/solid/index.js";
import {PhotoIcon} from "@heroicons/vue/16/solid/index.js";
</script>

<template>
  <div class="container">
    <h1>¡Usuario, te damos la bienvenida!</h1>
    <h2>Resumen General</h2>
    <div class="kpi-grid">
      <KPICard
          :icon="CurrencyDollarIcon"
          value="S/ 6.50"
          label="Tarifa promedio"
      />
      <KPICard
          :icon="MapPinIcon"
          value="12"
          label="Total de paraderos"
      />
      <KPICard
          :icon="StopCircleIcon"
          value="12"
          label="Total de rutas"
      />
      <KPICard
          :icon="ClockIcon"
          value="30 min"
          label="Intervalo promedio"
      />
    </div>
    <div>
      <h2>Tus paraderos</h2>
      <p class="">
      <span>Editar Paraderos </span>
        <ArrowRightIcon class="icono"/>
      </p>
    </div>
    <section class="container-paraderos">
      <div class="paradero">
        <div class="img-wrapper">
          <img src="..." alt="Foto del paradero">
        </div>
        <div class="content-paradero">
          <h3>Nombre del paradero</h3>
          <p>Región, Provincia, Distrito, Localidad</p>
          <p class="info">
            <MapPinIcon class="icono"/><span>Address</span>
          </p>
          <p class="info">
            <MapPinIcon class="icono"/><span>Referencia</span>
          </p>
          <button>Ver ubicación</button>
        </div>
        <ol class="schedule">
          <li><p>Lunes</p><p>12:00pm – 3:00pm</p></li>
          <li><p>Lunes</p><p>12:00pm – 3:00pm</p></li>
          <li><p>Lunes</p><p>12:00pm – 3:00pm</p></li>
          <li><p>Lunes</p><p>12:00pm – 3:00pm</p></li>
          <li><p>Lunes</p><p>12:00pm – 3:00pm</p></li>
          <li><p>Lunes</p><p>12:00pm – 3:00pm</p></li>
          <li><p>Lunes</p><p>12:00pm – 3:00pm</p></li>
        </ol>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container{
  max-width: 1280px;
  width: 100%;
  padding: 10px;
  margin: 0px auto;
}
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1rem;
}
.container-paraderos {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.paradero {
  display: grid;
  grid-template-columns: 300px 1fr 200px;
  gap: 1rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  align-items: stretch;
}

/* Columna de imagen */
.paradero .img-wrapper {
  background: #f1f4f8;
  position: relative;
}
.paradero .img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.icono{
  width: 20px;
  height: 20px;
}
/* Columna de contenido */
.content-paradero {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}
.content-paradero h3 {
  margin: 0;
  font-size: 1.4rem;
  color: #2d3748;
}
.content-paradero p:first-of-type {
  margin: 0;
  font-size: 0.9rem;
  color: #718096;
}
.content-paradero p.info {
  margin: 0;
  font-size: 0.95rem;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.content-paradero button {
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background: #4a5568;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: max-content;
}
.content-paradero button:hover {
  background: #2d3748;
}

/* Columna de horarios */
.schedule {
  list-style: none;
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
}
.schedule li {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #2d3748;
}
.schedule li p:first-child {
  font-weight: 500;
}
.schedule li p:last-child {
  color: #718096;
}

</style>
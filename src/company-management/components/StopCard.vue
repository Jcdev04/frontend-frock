<script setup>

import {MapPinIcon} from "@heroicons/vue/24/solid/index.js";
</script>

<template>
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
</template>

<style scoped>
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
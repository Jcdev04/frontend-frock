<script setup>
import {MapPinIcon} from "@heroicons/vue/16/solid/index.js";
import {ClockIcon} from "@heroicons/vue/16/solid/index.js";
</script>

<template>
  <section class="card-stop-container">
    <img src="" alt="image-stop" class="card-stop-img">
    <div class="card-stop-content">
      <h4>Empresa-Procedencia</h4>
      <p><span>Destino:</span> Destinox</p>
      <section>
        <div>
          <MapPinIcon class="icon"/>
          <p>Dirección</p>
        </div>
        <div>
          <ClockIcon class="icon"/>
          <p>Duración</p>
        </div>
      </section>
      <p class="card-stop-price">S/0.00</p>
    </div>
  </section>
</template>

<style scoped>
/* Contenedor de cada tarjeta */
.card-stop-container {
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 0.5rem;
  font-family: "Poppins", sans-serif;
}

/* Imagen principal */
.card-stop-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: #e1e4e8; /* placeholder */
}

/* Contenido interno */
.card-stop-content {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* Título */
.card-stop-content h4 {
  font-size: 1rem;
  margin: 0 0 0.25rem;
  font-weight: 600;
  color: #333;
}

/* Destino */
.card-stop-content p {
  font-size: 0.875rem;
  margin: 0 0 0.5rem;
  color: #555;
}
.card-stop-content p span {
  font-weight: 700;
  margin-right: 0.25rem;
  color: #222;
}

/* Sección de íconos */
.card-stop-content section {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  justify-content: space-between;
}
.card-stop-content section div {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.card-stop-content section div p{
  margin: 0px;
}
.card-stop-content .icon {
  width: 16px;
  height: 16px;
  color: #7A78FF;
}

/* Precio */
.card-stop-price {
  margin-top: auto;
  font-size: 1rem;
  font-weight: 700;
  color: #1a73e8;
}

</style>
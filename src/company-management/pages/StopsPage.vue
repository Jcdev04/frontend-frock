<script setup>

import StopCard from "@/company-management/components/StopCard.vue";
</script>

<template>
  <div class="container">
    <h1>¡Usuario, te damos la bienvenida!</h1>
    <section class="container-paraderos">
      <stop-card />
      <stop-card />
      <stop-card />
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
.container-paraderos {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
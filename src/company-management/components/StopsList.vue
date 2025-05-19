<script setup>
/**
 * Should receive props: isCRUD, to enable settings icon
 * */
import StopCard from "@/company-management/components/StopCard.vue";
</script>

<template>
  <section class="container-paraderos">
    <stop-card />
    <stop-card />
    <stop-card />
  </section>
</template>

<style scoped>
.container-paraderos {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
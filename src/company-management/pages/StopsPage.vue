<script setup>

import StopCard from "@/company-management/components/StopCard.vue";
import StopsList from "@/company-management/components/StopsList.vue";
</script>

<template>
  <div class="stops-header">
    <h1 class="stops-title">Paraderos</h1>
    <button class="nuevo-paradero-btn" >
      <span class="plus-icon">+</span> Agregar paradero
    </button>
  </div>
  <stops-list/>
</template>

<style scoped>

.stops-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.stops-title {
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

</style>
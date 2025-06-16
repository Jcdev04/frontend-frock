<!-- src/components/KpiCard.vue -->
<template>
  <div class="kpi-card">
    <component :style="{ color }"  :is="icon" class="kpi-card__icon" />
    <section class="">
      <div class="kpi-card__value">{{ value }}</div>
      <div class="kpi-card__label">{{ label }}</div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  icon:   { type: Object, required: true },
  value:  { type: [String, Number], required: true },
  label:  { type: String, required: true },
  color:  { type: String, required: true },
})
</script>

<style scoped>

.kpi-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 2rem;
  display: flex;

  gap: 0.5rem;
}

.kpi-card__icon {
  width: 50px;
  height: 50px;
}

.kpi-card__value {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
}

.kpi-card__label {
  font-size: 0.875rem;
  color: #4a5000;
}
</style>
<script setup>
import NewRoutePopupComponent from "@/network/components/routes-popUps/new-route-popup.component.vue";

const emit = defineEmits(["created"])
</script>

<template>
  <div class="container">
    <h1>Rutas</h1>
    <new-route-popup-component
        @created="$emit('created')"/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container h1{
  font-size: 36px;
  font-weight: bold;
  color: var(--color-primary);
}
</style>
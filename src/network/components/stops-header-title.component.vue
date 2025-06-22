<script>
import NewStopPopupComponent from "@/network/components/stop-popUps/new-stop-popup.component.vue";

export default {
  name: 'stopsHeaderTitle',
  components: {
    popUpNewStop: NewStopPopupComponent
  },
  emits: ['created'],
}
</script>

<template>
  <div class="container">
    <h1>Paraderos</h1>
    <pop-up-new-stop
        @created="$emit('created', $event)"
    />
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
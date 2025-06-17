<script>

import PopUpCreateRoute from "@/network/components/routes-popUps/pop-up-create-route.component.vue";

export default {
  name: 'routesHeaderTitle',
  components: {PopUpCreateRoute},

 /* components: {
    popUpNewStop
  },
*/
  emits: ['created'],
}
</script>

<template>
  <div class="container">
    <h1>Rutas</h1>
    <pop-up-create-route
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
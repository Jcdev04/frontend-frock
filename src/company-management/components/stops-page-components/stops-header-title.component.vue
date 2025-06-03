<script>
import popUpNewStop from "../stops-page-components/stop-popUps/newStop-popup.component.vue"; //popUp para cuando se clickee "nuevo paradero"

export default {
  name: 'stopsHeaderTitle',

  components: {
    popUpNewStop
  },
}
</script>

<template>
  <div class="container">
    <h1>Paraderos</h1>
    <pop-up-new-stop/>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container h1{
  font-family: Poppins, sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #7A78FF;
}
</style>
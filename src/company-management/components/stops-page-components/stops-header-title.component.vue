<script>

import { ref } from "vue"; //principalmente lo usamos para el atributo visible del button
import popUpNewStop from "../stops-page-components/stop-popUps/newStop-popup.component.vue"; //popUp para cuando se clickee "nuevo paradero"

export default {
  name: 'stopsHeaderTitle',

  components: {
    popUpNewStop
  },

  setup() {
    const visible = ref(false); //variable visible que controlara la aparicion del popUp


    return {visible}
  },
}
</script>

<template>
  <div class="container">

    <h1>Paraderos</h1>

    <pb-Button class="nuevo-paradero-button" icon="pi pi-plus" label="Nuevo Paradero"/>

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

.nuevo-paradero-button{
  /*Flex para centrar*/
  display: flex;
  align-items: center;

  /*Button en si*/
  background-color: #7A78FF;

  border: none;
  border-radius: 8px;

  padding: 8px 16px;

  max-height: 40px;
  height: 100%;

  max-width: 200px;
  width: 100%;

  /*Text Format*/
  font-size: 16px;
  font-family: Poppins, sans-serif;
  color: white;
}

.nuevo-paradero-button.p-button:hover{
  cursor: pointer;
  background-color: #CCF;
  color: white;
  border: none;
}

</style>
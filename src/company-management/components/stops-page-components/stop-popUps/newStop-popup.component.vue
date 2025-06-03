<script>
import { ref } from "vue"; //principalmente lo usamos para el atributo visible del button

//tunear form popup
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from 'zod';

export default {
  name: "popUpNewStop",

  setup() {
    const visible = ref(false); //variable visible que controlara la aparicion del popUp

    const initialValues = ref({
      purchaseQuantity: 0
    });

    const resolver = ref(zodResolver(
        z.object({
          purchaseQuantity: z.union([z.number().gt(0, { message: 'Must be greater than 0.' }).lt(10, { message: 'Must be less than 10.' }), z.literal(null)]).refine((val) => val !== null, { message: 'Number is required.' })
        })
    ));

    return {visible, initialValues, resolver};
  }
}
</script>

<template>

  <pb-Button class="nuevo-paradero-button" icon="pi pi-plus" label="Nuevo Paradero" @click="visible = true"/>

  <pb-Dialog v-model:visible="visible" modal header="Nuevo Paradero" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '175vw', '575px': '90vw' }">
    <template #header>
      <div class="dialog-header-container">
        <div class="title-container">
          <h1>Nuevo Paradero</h1>
        </div>
      </div>
    </template>

    <div class="complete-info-container">
      <div class="flex items-center gap-4 mb-4">
        <label for="Nombre del paradero" class="font-semibold w-24">Nombre del paradero</label>
        <pb-InputText id="stop-name" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="Telefono" class="font-semibold w-24">Telefono</label>
        <pb-InputText id="stop-name" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="Direccion" class="font-semibold w-24">Direccion</label>
        <pb-InputText id="stop-name" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="Referencia" class="font-semibold w-24">Referencia</label>
        <pb-InputText id="stop-name" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="Region" class="font-semibold w-24">Region</label>
        <pb-InputText id="stop-name" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="Provincia" class="font-semibold w-24">Provincia</label>
        <pb-InputText id="stop-name" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="Distrito" class="font-semibold w-24">Distrito</label>
        <pb-InputText id="stop-name" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="Localidad" class="font-semibold w-24">Localidad</label>
        <pb-InputText id="stop-name" class="flex-auto" autocomplete="off" />
      </div>
    </div>


  </pb-Dialog>
</template>

<style scoped>
.dialog-header-container{
  display: flex;
  justify-content: center;
  width: 100%;
}

.title-container{
  color: #7A78FF;
  border-bottom: #7A78FF solid 1px;
  padding: 10px;
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
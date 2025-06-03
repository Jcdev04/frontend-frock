<script>
export default {
  name: "stopCard"
}
</script>

<template>
  <pb-Card class="stop-card">
    <template #content>
      <div class="test-container">

        <div class="image-container">
          <img src="https://picsum.photos/360/165" alt="test-image" width="360" height="165">
        </div>

        <div class="details-container">

          <div class="header-details-container">
            <h1>Nombre del paradero</h1>
            <h2>Region, Provincia, distrito, localidad</h2>
          </div>

          <div class="description-details-container">
            <div class="address-container">
              <i class="pi pi-map-marker" style="font-size: 1rem; color: #484848"></i>

              <h2>Address</h2>
            </div>

            <div class="reference-container">
              <i class="pi pi-question-circle" style="font-size: 1rem; color: #484848"></i>

              <h2>Reference</h2>
            </div>
          </div>

          <pb-Button class="ubicacion-button" label="Ver Ubicacion"/>

        </div>

        <div class="main-button-frame">
          <pb-Button class="edit-button" icon="pi pi-pencil"/>

          <pb-Button class="delete-button" icon="pi pi-trash"/>
        </div>


      </div>

    </template>
  </pb-Card>
</template>

<style scoped>

.stop-card { /*Por no decir todos, toda esta configuracion fue traida desde el figma pero de manera manual*/
  display: flex;
  align-items: center;
  justify-content: center;

  /*Dimensiones*/
  width: 100%;
  height: 215px;

  /*Padding*/
  padding: 20px 0;

  /*Borders*/
  border-color: #CCCCFF;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;

  /*Background Color*/
  background-color: white;
}

.test-container {
  display: flex;
  flex-direction: row;

  width: 60vw;

  /**/
  gap: 20px;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  border-radius: 5px;
}



.details-container {
  /**/
  display: flex;
  flex-direction: column;

  /**/
  gap: 10px;

  /**/
  width: 627px;

  /**/
  font-family: Poppins, sans-serif;
}
.header-details-container {
  display: flex;
  flex-direction: column;
}
.header-details-container h1{
  color: #7A78FF;
  font-weight: normal;
  font-size: 25px;
}
.header-details-container h2{
  color: #B4B4B4;
  font-weight: normal;
  font-size: 14px;
}



.description-details-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.description-details-container h2{
  color: #484848;
  font-weight: normal;
  font-size: 14px;
}
.address-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.reference-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}


.ubicacion-button {
  /*Flex para centrar*/
  display: flex;
  align-items: center;
  justify-content: center;

  /*Button en si*/
  background-color: #7A78FF;

  border: none;
  border-radius: 5px;

  padding: 5px 10px;

  max-height: 34px;
  height: 100%;

  width: 30%;

  /*Text Format*/
  font-size: 14px;
  font-family: Poppins, sans-serif;
  color: white;
}

.ubicacion-button.p-button:hover{
  cursor: not-allowed;
  background-color: #7A78FF;
  color: white;
  border: none;
}

.main-button-frame {
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: start;

  gap: 13px;
}

.edit-button{
  background-color: #478BFF;
  border-color: transparent;
}

.delete-button{
  background-color: #FF2C2C;
  border-color: transparent;
}

.edit-button.p-button:hover{
  background-color: lightblue;
  border-color: transparent;
}

.delete-button.p-button:hover {
  background-color: lightcoral;
  border-color: transparent;
}



</style>
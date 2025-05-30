<script setup>

import AppToolbar from "@/shared/components/AppToolbar.vue";
</script>

<template>
  <AppToolbar />

  <main class="page-container">
    <div class="container">
      <router-view />
    </div>
  </main>

</template>

<style scoped>

.page-container {  /*Basicamente la utilidad de esta page container es para centrar a otro container que tiene un tamaño fixed*/
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.container{
  /*Flex*/
  display: flex;
  flex-direction: column;

  /*Margins*/
  margin-top: 1%;

  /*Fixed Width*/
  max-width: 1250px;
  width: 100%;

  padding: 35px 0.5vw;

  /**/
  gap: 40px
}
</style>
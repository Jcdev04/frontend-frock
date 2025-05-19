<script setup>

import AppToolbar from "@/shared/components/AppToolbar.vue";
</script>

<template>
  <AppToolbar />
  <main class="container">
    <router-view />
  </main>
</template>

<style scoped>
  .container{
    max-width: 1280px;
    width: 100%;
    padding: 30px;
    margin: 0 auto;
}
</style>
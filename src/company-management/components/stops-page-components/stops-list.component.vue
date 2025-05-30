<script>
/**
 * Should receive props: isCRUD, to enable settings icon
 * */
import stopCard from "./stop-card/stop-card.component.vue";

export default {
  name: "stopsList",
  components: {
    stopCard,
  }
}

</script>

<template>
  <section class="container-paraderos">
    <stop-card/>
    <stop-card/>
    <stop-card/>
    <stop-card/>
    <stop-card/>
  </section>
</template>

<style scoped>
.container-paraderos {
  /**/
  width: 100%;

  /**/
  display: flex;
  flex-direction: column;

  /**/
  padding: 10px 0;

  /**/
  gap: 10px;
}
</style>
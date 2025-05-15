<script setup>
import {UserCircleIcon} from "@heroicons/vue/16/solid/index.js";
</script>

<template>
  <header id="tool-bar-stops">
    <section class="container-header-stops">
    <img src="/img/logo-chapaturuta-64x64.png" alt="Logo ChapaTuRuta"/>
    <div class="header-menu">
      <button class="button-profile">
        <UserCircleIcon class="icon"/>
        <span>Perfil</span>
      </button>
    </div>
    </section>
  </header>
</template>

<style scoped>
#tool-bar-stops {
  padding: 20px;
}

.container-header-stops{
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
  padding: 0px 12px;
}
.container-header-stops img{
  width: 50px;
}
.header-menu{
  display: flex;
}
.button-profile{
  background-color: white;
  border: 1px solid lightgray;
  color: gray;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  cursor: pointer;
}
.icon{
  width: 20px;
}

#button-profile{
  display: flex;
}

</style>
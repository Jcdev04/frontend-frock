<template>
  <div id="app">
    <RutasView />
  </div>
</template>

<script>
import RutasView from './combiroutes/presentation/views/RutasView.vue'

export default {
  name: 'App',
  components: {
    RutasView
  }
}
</script>

<style>
:root {
  --color-primary: #7A78FF;
  --color-off: #CCCCFF;
  --color-secondary: #F8F9F0;
  --color-tertiary-gray: #E8E0E8;
  --color-tertiary-inputs: #BCB73E;
  --color-text: #000000;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: white;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: white;
}
</style>
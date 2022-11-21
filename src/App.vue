<template>
  <router-view />
</template>
<script>

</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.screen-width {
  height: 100vh;
  width: 100vw;
}

.default-margin {
  padding: 1.2em;
}

.row {
  display: flex;
}

.col {
  display: flex;
  flex-direction: column;
}

button {
  cursor: pointer;
}
</style>

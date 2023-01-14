<template>
  <div class="main-wrapper">
    <Navigator />
    <Maket />
    <Properties />
  </div>
</template>

<script setup lang="ts">
import Navigator from "./components/Navigator.vue";
import Maket from "./components/Maket.vue";
import Properties from "./components/properties/Properties.vue";
</script>

<style scoped>
.main-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
}
</style>

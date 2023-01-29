<template>
  <div class="main-wrapper">
    <Navigator />
    <Maket />
    <Properties />
  </div>
</template>

<script setup lang="ts">
import Navigator from "./components/navigator/Navigator.vue";
import Maket from "./components/maket/Maket.vue";
import Properties from "./components/properties/Properties.vue";
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.main-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  background: $main-background-color;
}
</style>

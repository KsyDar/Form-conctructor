<template>
  <div class="main-wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.main-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  background: $main-background-color;
}
</style>

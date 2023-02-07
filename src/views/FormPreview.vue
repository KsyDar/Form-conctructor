<template>
  <button
    class="default-button default-button--delete button-preview"
    @click="router.push({ name: 'FormConstructor' })"
  >
    Назад
  </button>
  <Maket />
</template>

<script setup lang="ts">
import Maket from "@/components/maket/Maket.vue";
import router from "@/router";
</script>

<style scoped lang="scss">
.button-preview {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  max-width: 10rem;
}
</style>

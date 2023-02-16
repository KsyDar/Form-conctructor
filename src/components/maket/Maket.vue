<template>
  <div class="maket">
    <form action="" class="form">
      <div class="maket__tree">
        <MaketTree :tree="tree" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// COMPONENTS
import MaketTree from "./MaketTree.vue";
// STORE
import { useItemsStore } from "@/store/items";
import { storeToRefs } from "pinia";

const { items: tree } = storeToRefs(useItemsStore());
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.maket {
  display: flex;
  flex-direction: column;
  background: $form-background-color;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  border-radius: 10px;
  margin: 1rem;
  width: 100%;

  &__tree {
    display: flex;
    width: 100%;
    height: 100%;
  }
}

.form {
  display: grid;
  grid-gap: 1px;
  border: 1px solid #000;
  background: #fff;
  margin: 1rem;
}
</style>

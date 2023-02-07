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
import { useItemsStore } from "@/store/items";
import { storeToRefs } from "pinia";
import MaketTree from "./MaketTree.vue";

const { items: tree } = storeToRefs(useItemsStore());
</script>

<style scooped lang="scss">
@use "@/assets/styles/variables" as *;

.maket {
  display: flex;
  flex-direction: column;
  background: $form-background-color;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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

  &__col {
    background: $primary-button-color;
    display: grid;

    &--selected {
      border: 2px solid yellow;
    }

    &__name {
      color: #fff;
      margin: auto;
      font-size: 2rem;
    }
  }

  &__row {
    background: #fff;
    border: 2px solid #000;

    &--selected {
      border: 2px solid yellow;
    }

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.5rem;
    padding: 1rem;
  }

  &__element {
    display: flex;
  }
}
</style>

<template>
  <div class="navigator">
    <div class="navigator__buttons">
      <button class="default-button" @click="itemsStore.addItem">
        Создать
      </button>
      <button
        class="default-button default-button--delete"
        @click="itemsStore.deleteItem"
      >
        Удалить
      </button>
    </div>

    <h1 class="navigator__title" @click.stop="itemsStore.cleanSelectedItem">
      Состав формы:
    </h1>

    <div class="navigator__items">
      <ul class="navigator__tree">
        <li>
          <NavigatorTree :tree="tree"></NavigatorTree>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// STORE
import { useItemsStore } from "@/store/items";
import { storeToRefs } from "pinia";
// COMPONENTS
import NavigatorTree from "./NavigatorTree.vue";

const { items: tree } = storeToRefs(useItemsStore());
const itemsStore = useItemsStore();
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.navigator {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
  min-width: 30rem;
  background: $white-color;
  box-shadow: rgba(14, 30, 37, 0.12) 0 2px 4px 0,
    rgba(14, 30, 37, 0.32) 0 2px 16px 0;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: rgba(67, 71, 85, 0.27) 0 0 0.25em,
      rgba(90, 125, 188, 0.05) 0 0.25em 1em;
    padding: 1rem;
  }

  &__title {
    color: $primary-font-color;
    cursor: pointer;
  }

  &__items {
    overflow: auto;
    margin-top: 1rem;
    padding: 1rem;
    font-size: 1.5rem;
    border-radius: 10px;
    box-shadow: rgba(67, 71, 85, 0.27) 0 0 0.25em,
      rgba(90, 125, 188, 0.05) 0 0.25em 1em;
  }

  &__tree {
    padding: 0;
    color: $secondary-font-color;
  }
}
</style>

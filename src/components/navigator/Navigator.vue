<template>
  <div class="navigator">
    <div class="navigator__buttons">
      <button class="navigator__buttons__item" @click="itemsStore.addItem">
        Создать
      </button>
      <button
        class="navigator__buttons__item navigator__buttons__item--delete"
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
import { useItemsStore } from "@/store/items";
import type { TreeChild } from "@/types/navigatorTree";
import { storeToRefs } from "pinia";
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
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
      rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    padding: 1rem;

    &__item {
      background-image: linear-gradient(-180deg, #37aee2 0%, #1e96c8 100%);
      border-radius: 5px;
      color: $white-color;
      display: flex;
      font-size: 1.5rem;
      justify-content: center;
      padding: 1rem 1.75rem;
      text-decoration: none;
      width: 100%;
      border: 0;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;

      &:hover {
        background-image: linear-gradient(-180deg, #1d95c9 0%, #17759c 100%);
      }

      &--delete {
        color: $primary-font-color;
        background: $white-color;
        border: 1px solid $button-border-color;
        margin-left: 0.5rem;

        &:hover {
          box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
            rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
          background-image: none;
        }
      }
    }
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
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
      rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  }

  &__tree {
    padding: 0;
    color: $secondary-font-color;
  }
}
</style>

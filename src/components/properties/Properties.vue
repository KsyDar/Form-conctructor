<template>
  <div class="properties">
    <h1 class="properties__title">Свойства</h1>
    <div v-if="selectedItem" class="properties__content">
      <ul class="properties__list">
        <li class="properties__list__item">
          <span>Название:</span>
          <input
            class="properties__list__item__input"
            type="text"
            v-model="selectedItem.name"
            maxlength="30"
          />
        </li>

        <li
          class="properties__list__item"
          v-if="selectedItem.type !== TreeElementType.COL"
        >
          <span>Тип элемента:</span>
          <UIselect
            v-model="selectedOption"
            :options="options"
            @changeElement="changeElement($event)"
          >
          </UIselect>
        </li>

        <li
          class="properties__list__item"
          v-if="selectedItem.type === TreeElementType.ELEMENT"
        >
          <ElementProperties />
        </li>
      </ul>
      <button
        class="properties__list__button"
        @click="itemsStore.saveChanges()"
      >
        Сохранить
      </button>
    </div>
    <h3 class="properties__subtitle" v-else>Выберите селектор!</h3>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from "@/store/items";
import { useSelectStore } from "@/store/select";
import { storeToRefs } from "pinia";
import ElementProperties from "./elementsproperties/ElementProperties.vue";
import UIselect from "../ui/UIselect.vue";
import { TreeElementType } from "@/types/navigatorTree";
import type { HasIdName } from "@/types/navigatorTree";

const { selectedItem } = storeToRefs(useItemsStore());
const itemsStore = useItemsStore();

const selectStore = useSelectStore();
const options = selectStore.options;
const { selectedOption } = storeToRefs(useSelectStore());

const changeElement = (option: HasIdName) => {
  selectStore.updateSelectedOption(option);

  if (itemsStore.selectedItem?.type === TreeElementType.ELEMENT) {
    itemsStore.changeElement(option.name);
  } else if (
    itemsStore.selectedItem?.type === TreeElementType.ROW &&
    itemsStore.selectedItem.element === null
  ) {
    itemsStore.addElement(option.name);
  } else if (itemsStore.selectedItem?.type === TreeElementType.ROW) {
    itemsStore.changeElement(option.name);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.properties {
  background: $primary-background-color;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $light-purple-color;
  overflow-y: auto;
  overflow-x: clip;

  &__title {
    color: #fff;
  }

  &__subtitle {
    font-size: 1.5rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    font-size: 1.5rem;

    &__item {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      &__input {
        margin-left: 3rem;
      }
    }

    &__button {
      border-radius: 15%;
      border: 2px solid $secondary-button-color;
      color: $primary-button-color;
      background: $light-purple-color;
      padding: 1rem;
      position: absolute;
      top: 90%;

      &:hover {
        background: $secondary-hover-color;
      }
    }
  }
}
</style>

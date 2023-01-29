<template>
  <div class="properties">
    <h1 class="properties__title">Свойства</h1>
    <div v-if="selectedItem" class="properties__content">
      <ul class="properties__list">
        <li class="properties__list__item">
          <UITextField
            :label="'Название'"
            v-model="selectedItem.name"
            @changed="itemsStore.saveChanges"
          />
        </li>

        <li class="properties__list__item">
          <UIselect
            v-model="selectedOption"
            :options="options"
            :label="'Тип элемента'"
            @changeItem="itemsStore.changeItemType($event)"
          >
          </UIselect>
        </li>

        <li
          class="properties__list__item"
          v-if="selectedItem.type === TreeChildType.ELEMENT"
        >
          <ElementProperties />
        </li>
      </ul>
      <!-- <button
        class="properties__list__button"
        @click="itemsStore.saveChanges()"
      >
        Сохранить
      </button> -->
    </div>
    <h3 class="properties__subtitle" v-else>Выберите селектор!</h3>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from "@/store/items";
import { storeToRefs } from "pinia";
import ElementProperties from "./elementsproperties/ElementProperties.vue";
import UIselect from "../ui/UIselect.vue";
import UITextField from "../ui/UITextField.vue";
import { TreeChildType, TreeElementType } from "@/types/navigatorTree";
import type { HasIdName } from "@/types/navigatorTree";
import { v4 } from "uuid";
import { ref, watch } from "vue";

const { selectedItem } = storeToRefs(useItemsStore());
const itemsStore = useItemsStore();

const options: HasIdName[] = [
  {
    id: v4(),
    name: TreeChildType.COL,
  },
  {
    id: v4(),
    name: TreeChildType.ROW,
  },
  {
    id: v4(),
    name: TreeChildType.ELEMENT,
  },
];

const selectedOption = ref<HasIdName>(options[0]);

watch(
  () => selectedItem.value,
  () => {
    if (selectedItem.value !== null) {
      selectedOption.value = options.find(
        (el) => el.name === selectedItem.value.type
      );
    } else {
      selectedOption.value = options[0];
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.properties {
  background: $white-color;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $secondary-font-color;
  min-width: 30rem;

  &__title {
    color: $primary-font-color;
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
      border-radius: 10px;
      box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.25em,
        rgb(90 125 188 / 5%) 0px 0.25em 1em;
      padding: 1rem;
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

<template>
  <div class="navigator">
    <div class="navigator__buttons">
      <button class="navigator__buttons__item" @click="addCol()">
        Добавить колонку
      </button>
      <button
        class="navigator__buttons__item navigator__buttons__item--delete"
        @click="deleteCol()"
      >
        Удалить колонку
      </button>
      <button class="navigator__buttons__item" @click="addRow()">
        Добавить строку
      </button>
      <button
        class="navigator__buttons__item navigator__buttons__item--delete"
        @click="deleteRow()"
      >
        Удалить строку
      </button>
    </div>

    <div class="navigator__border"></div>

    <div class="navigator__items">
      <ul class="navigator__tree">
        <li
          class="navigator__tree__col"
          v-for="col in tree.cols"
          :key="col.id"
          @click.self="selectItem(col)"
          :class="{
            'navigator__tree__col--selected':
              col.id === itemsStore.selectedItemId,
          }"
        >
          {{ col.name }}
          <ul>
            <li
              v-for="row in col.rows"
              :key="row.id"
              @click.self="selectItem(row)"
              class="navigator__tree__row"
              :class="{
                'navigator__tree__row--selected':
                  row.id === itemsStore.selectedItemId,
              }"
            >
              {{ row.name }}
              <ul v-if="row.element && row.element.properties">
                <li
                  @click.self="selectItem(row.element)"
                  class="navigator__tree__element"
                  :class="{
                    'navigator__tree__element--selected':
                      row.element.id === itemsStore.selectedItemId,
                  }"
                >
                  {{ row.element.name }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from "@/store/items";
import type { TreeElement } from "@/types/navigatorTree";
import { storeToRefs } from "pinia";

const { items: tree } = storeToRefs(useItemsStore());
const itemsStore = useItemsStore();

const addCol = () => {
  itemsStore.addCol();
};

const addRow = () => {
  itemsStore.addRow();
};

const deleteCol = () => {
  itemsStore.deleteCol();
};

const deleteRow = () => {
  itemsStore.deleteRow();
};

const selectItem = (item: TreeElement | null) => {
  if (item) {
    itemsStore.selectItem(item.id);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.navigator {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: $primary-background-color;

  &__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 1rem;
    margin: 1rem;

    &__item {
      border-radius: 15%;
      border: 2px solid $secondary-button-color;
      color: $light-purple-color;
      background: $primary-button-color;

      &:hover {
        background: $primary-hover-color;
      }

      &--delete {
        color: $primary-button-color;
        background: $light-purple-color;

        &:hover {
          background: $secondary-hover-color;
        }
      }
    }
  }

  &__border {
    height: 0.1rem;
    widows: 100%;
    background: $primary-button-color;
  }

  &__items {
    overflow: auto;
    margin: 1rem;
    font-size: 1.3rem;
  }

  &__tree {
    padding: 0;
    color: $light-purple-color;

    &__col {
      margin-bottom: 1rem;

      &:hover {
        cursor: pointer;
      }
      &--selected {
        color: #fff;
      }
    }
    &__row {
      margin-bottom: 1rem;
      color: $light-purple-color;
      margin-right: 1rem;

      &:hover {
        cursor: pointer;
      }
      &--selected {
        color: #fff;
      }
    }

    &__element {
      color: $light-purple-color;

      &:hover {
        cursor: pointer;
      }

      &--selected {
        color: #fff;
      }
    }
  }
}
</style>

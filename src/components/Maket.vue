<template>
  <div class="maket">
    <form
      action=""
      class="form"
      :style="{
        'grid-template-columns': `repeat(${itemsStore.colsCounter}, 1fr)`,
      }"
    >
      <div
        class="form__col"
        v-for="col in tree.cols"
        :key="col.id"
        :style="{
          'grid-template-rows': `repeat(${itemsStore.rowsCounter})`,
        }"
        :class="{
          'form__col--selected': col.id === itemsStore.selectedItemId,
        }"
      >
        <div
          class="form__row"
          :class="{
            'form__row--selected':
              row.id === itemsStore.selectedItemId ||
              row.element?.id === itemsStore.selectedItemId,
          }"
          v-for="row in col.rows"
          :key="row.id"
        >
          <div
            v-if="row.element && row.element.properties"
            class="form__element"
          >
            <component
              :is="element(row.element)"
              v-bind="elementProps(row.element)"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from "@/store/items";
import { storeToRefs } from "pinia";
import UIinput from "./ui/UIinput.vue";
import UIcheckbox from "./ui/UIcheckbox.vue";
import UIselect from "./ui/UIselect.vue";
import UIbutton from "./ui/UIbutton.vue";
import { TreeElementValue } from "@/types/navigatorTree";
import type { Elements } from "@/types/navigatorTree";

const { items: tree } = storeToRefs(useItemsStore());
const itemsStore = useItemsStore();

const element = (element: Elements) => {
  switch (element.value) {
    case TreeElementValue.INPUT:
      return UIinput;
    case TreeElementValue.CHECKBOX:
      return UIcheckbox;
    case TreeElementValue.SELECT:
      return UIselect;
    case TreeElementValue.BUTTON:
      return UIbutton;
  }
};

const elementProps = (element: Elements) => {
  return element.properties;
};
</script>

<style scooped lang="scss">
@use "@/assets/styles/variables" as *;

.maket {
  display: flex;
  flex-direction: column;
  background: $light-purple-color;
  overflow: auto;
  height: 100%;
}

.form {
  display: grid;
  grid-gap: 1px;
  border: 1px solid $primary-background-color;
  background: $primary-background-color;
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
    border: 2px solid $primary-background-color;

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

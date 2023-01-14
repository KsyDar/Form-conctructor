<template>
  <ul
    class="element-props"
    v-if="
      selectedItem?.type === TreeElementType.ELEMENT && selectedItem.properties
    "
  >
    <li class="element-props__item">
      <span>Ярлык:</span>
      <input type="text" v-model="selectedItem.properties.label" />
    </li>

    <li
      class="element-props__item"
      v-if="selectedItem.value === TreeElementValue.INPUT"
    >
      <span>Количество символов:</span>
      <input
        class="element-props__item__input"
        type="number"
        v-model="selectedItem.properties.maxLength"
      />
    </li>

    <li
      class="element-props__item"
      v-if="selectedItem.value === TreeElementValue.SELECT"
    >
      <SelectProperties
        :options="selectedItem.properties.options"
        v-model="selectedItem.properties.modelValue"
        @addOption="addOption()"
        @deleteOption="deleteOption($event)"
        @selectOption="selectOption($event)"
      />
    </li>

    <li
      class="element-props__item"
      v-if="selectedItem.value === TreeElementValue.BUTTON"
    >
      <ButtonProperties @changeButton="changeButton($event)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import SelectProperties from "./SelectProperties.vue";
import ButtonProperties from "./ButtonProperties.vue";
import UIselect from "@/components/ui/UIselect.vue";
import { TreeElementValue, TreeElementType } from "@/types/navigatorTree";
import type {
  HasIdName,
  SelectProps,
  ButtonProps,
} from "@/types/navigatorTree";
import { storeToRefs } from "pinia";
import { useItemsStore } from "@/store/items";
import { v4 } from "uuid";

const { selectedItem } = storeToRefs(useItemsStore());
const itemsStore = useItemsStore();

const addOption = () => {
  const newOption: HasIdName = {
    id: v4(),
    name: "Новая опция",
  };

  if (
    selectedItem.value?.type === TreeElementType.ELEMENT &&
    selectedItem.value.value === TreeElementValue.SELECT
  ) {
    const updatedOptions = selectedItem.value.properties?.options;
    if (updatedOptions) {
      updatedOptions.push(newOption);
      const newProperties: SelectProps<HasIdName> = {
        options: updatedOptions,
        modelValue: selectedItem.value.properties
          ? selectedItem.value.properties.modelValue
          : null,
        label: "",
      };
      itemsStore.updateElementProperties(newProperties);
    }
  }
};

const deleteOption = (optionId: string) => {
  if (
    selectedItem.value?.type === TreeElementType.ELEMENT &&
    selectedItem.value.value === TreeElementValue.SELECT
  ) {
    const updatedOptions = selectedItem.value.properties?.options;
    if (updatedOptions) {
      const deletedOption = selectedItem.value.properties?.options.find(
        (el) => el.id === optionId
      );

      if (!deletedOption) return;
      if (deletedOption.id === selectedItem.value.properties?.modelValue?.id) {
        selectedItem.value.properties.modelValue = null;
      }

      updatedOptions.splice(updatedOptions.indexOf(deletedOption), 1);

      const newProperties: SelectProps<HasIdName> = {
        options: updatedOptions,
        modelValue: selectedItem.value.properties
          ? selectedItem.value.properties.modelValue
          : null,
        label: "",
      };
      itemsStore.updateElementProperties(newProperties);
    }
  }
};

const selectOption = (option: HasIdName) => {
  itemsStore.selectOption(option);
};

const changeButton = (functionName: "submit" | "reset" | undefined) => {
  if (
    selectedItem.value?.type === TreeElementType.ELEMENT &&
    selectedItem.value.value === TreeElementValue.BUTTON &&
    selectedItem.value.properties
  ) {
    const newProperties: ButtonProps = {
      label: selectedItem.value.properties.label,
      function: functionName,
    };
    itemsStore.updateElementProperties(newProperties);
  }
};
</script>

<style scoped lang="scss">
.element-props {
  list-style: none;
  padding: 0;
  width: 100%;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
}
</style>

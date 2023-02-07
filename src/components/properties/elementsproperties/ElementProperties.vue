<template>
  <ul
    class="element-props"
    v-if="
      selectedItem?.type === TreeChildType.ELEMENT && selectedItem.properties
    "
  >
    <li class="element-props__item">
      <UITextField
        :label="'Ярлык'"
        v-model="selectedItem.properties.label"
        @changed="itemsStore.saveChanges"
      />
    </li>

    <li class="element-props__item">
      <UIselect
        v-model="selectedOption"
        :options="options"
        :label="'Вариант'"
        @changeItem="itemsStore.changeElementType($event)"
      >
      </UIselect>
    </li>

    <li
      class="element-props__item"
      v-if="selectedItem.value === TreeElementType.INPUT"
    >
      <UITextField
        :label="'Количество символов'"
        v-model="selectedItem.properties.maxLength"
        @changed="itemsStore.saveChanges"
      />
    </li>

    <li
      class="element-props__item element-props__item--select"
      v-if="selectedItem.value === TreeElementType.SELECT"
    >
      <SelectProperties
        :options="selectedItem.properties.options"
        v-model="selectedItem.properties.modelValue"
        @addOption="addOption()"
        @deleteOption="deleteOption($event)"
        @selectOption="itemsStore.selectOption($event)"
        @unselectOption="itemsStore.unselectOption"
      />
    </li>

    <li
      class="element-props__item"
      v-if="selectedItem.value === TreeElementType.BUTTON"
    >
      <ButtonProperties @changeButton="changeButton($event)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import SelectProperties from "./SelectProperties.vue";
import ButtonProperties from "./ButtonProperties.vue";
import UIselect from "@/components/ui/UIselect.vue";
import UITextField from "@/components/ui/UITextField.vue";
import {
  ButtonType,
  TreeChildType,
  TreeElementType,
} from "@/types/navigatorTree";
import type {
  HasIdName,
  SelectProps,
  ButtonProps,
} from "@/types/navigatorTree";
import { storeToRefs } from "pinia";
import { useItemsStore } from "@/store/items";
import { v4 } from "uuid";
import { ref, watch } from "vue";

const { selectedItem } = storeToRefs(useItemsStore());
const itemsStore = useItemsStore();

const options: HasIdName[] = [
  {
    id: v4(),
    name: TreeElementType.INPUT,
  },
  {
    id: v4(),
    name: TreeElementType.CHECKBOX,
  },
  {
    id: v4(),
    name: TreeElementType.SELECT,
  },
  {
    id: v4(),
    name: TreeElementType.BUTTON,
  },
];

const selectedOption = ref<HasIdName>(options[0]);

watch(
  () => selectedItem.value,
  () => {
    if (
      selectedItem.value !== null &&
      selectedItem.value.type === TreeChildType.ELEMENT
    ) {
      selectedOption.value = options.find(
        (el) => el.name === selectedItem.value?.value
      );
    } else {
      selectedOption.value = options[0];
    }
  },
  { immediate: true }
);

const addOption = () => {
  const newOption: HasIdName = {
    id: v4(),
    name: "Новая опция",
  };

  if (
    selectedItem.value?.type === TreeChildType.ELEMENT &&
    selectedItem.value.value === TreeElementType.SELECT
  ) {
    const updatedOptions = selectedItem.value.properties?.options;
    if (updatedOptions) {
      updatedOptions.push(newOption);
      const newProperties: SelectProps<HasIdName> = {
        options: updatedOptions,
        modelValue: selectedItem.value.properties?.modelValue || null,
        label: selectedItem.value.properties?.label || "",
      };
      itemsStore.updateElementProperties(newProperties);
    }
  }
};

const deleteOption = (optionId: string) => {
  if (
    selectedItem.value?.type === TreeChildType.ELEMENT &&
    selectedItem.value.value === TreeElementType.SELECT
  ) {
    const options = selectedItem.value.properties?.options;
    if (options) {
      const deletedOption = options.find((el: HasIdName) => el.id === optionId);
      if (!deletedOption) return;

      options.splice(options.indexOf(deletedOption), 1);

      if (deletedOption.id === selectedItem.value.properties?.modelValue?.id) {
        selectedItem.value.properties.modelValue = options[0];
      }

      const newProperties: SelectProps<HasIdName> = {
        options: options,
        modelValue: selectedItem.value.properties?.modelValue || null,
        label: selectedItem.value.properties?.label || "",
      };
      itemsStore.updateElementProperties(newProperties);
    }
  }
};

const changeButton = (functionName: ButtonType | undefined) => {
  if (
    selectedItem.value?.type === TreeChildType.ELEMENT &&
    selectedItem.value.value === TreeElementType.BUTTON &&
    selectedItem.value.properties
  ) {
    const newProperties: ButtonProps = {
      label: selectedItem.value.properties.label || "",
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

    &--select {
      margin-bottom: 0;
    }
  }
}
</style>

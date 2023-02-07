<template>
  <div class="select-properties">
    <div
      class="select-properties__option"
      v-for="option in options"
      :key="option.id"
    >
      <StarIcon
        v-if="selectedOption(option.id)"
        @click="emits('unselectOption')"
      />
      <EmptyStarIcon v-else @click="emits('selectOption', option)" />
      <UITextField v-model="option.name" :label="'Имя опции'" />
      <DeleteIcon
        style="width: 2rem; cursor: pointer"
        @click="emits('deleteOption', option.id)"
        v-if="options.length > 1"
      />
    </div>
    <div class="select-properties__button">
      <button
        @click="emits('addOption')"
        class="default-button default-button--delete select-button"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HasIdName } from "@/types/navigatorTree";
import UITextField from "@/components/ui/UITextField.vue";
import DeleteIcon from "../../../assets/icons/delete.svg";
import StarIcon from "../../../assets/icons/star.svg";
import EmptyStarIcon from "../../../assets/icons/emptyStar.svg";

type PropType = {
  options: HasIdName[];
  modelValue: HasIdName | null;
};

type EmitType = {
  (e: "update:modelValue", value: number): void;
  (e: "addOption"): void;
  (e: "deleteOption", value: string): void;
  (e: "selectOption", value: HasIdName): void;
  (e: "unselectOption"): void;
};

const props = defineProps<PropType>();
const emits = defineEmits<EmitType>();

const selectedOption = (id: string) => {
  if (id === props.modelValue?.id) return true;
  return false;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.select-properties {
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  width: 100%;
  max-height: 30rem;
  overflow: auto;
  border-radius: 10px;
  border: 2px solid $button-border-color;
  padding: 1rem;

  &__option {
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid $button-border-color;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  &__button {
    display: flex;
    justify-content: center;
    font-weight: 700;
  }
}

.select-button {
  border-radius: 50%;
  width: fit-content;
}
</style>

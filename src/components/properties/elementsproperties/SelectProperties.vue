<template>
  <div class="select-properties">
    <div
      class="select-properties__option"
      v-for="option in options"
      :key="option.id"
    >
      <StarIcon v-if="selectedOption(option.id)" />
      <EmptyStarIcon v-else @click="emits('selectOption', option)" />
      <UITextField v-model="option.name" :label="'Имя опции'" />
      <DeleteIcon
        style="width: 2rem; cursor: pointer"
        @click="emits('deleteOption', option.id)"
        v-if="options.length > 1"
      />
    </div>
    <!-- <ul class="select-properties__col">
        <li class="select-properties__row">Название</li>
        <li
          class="select-properties__row"
          v-for="option in options"
          :key="option.id"
          style="display: flex"
        >
          <div
            class="select-properties__mark"
            @click="emits('selectOption', option)"
          >
            <span v-if="selectedOption(option.id)">*</span>
          </div>
          <input
            class="select-properties__input"
            :class="{
              'select-properties__input--selected': selectedOption(option.id),
            }"
            type="text"
            v-model="option.name"
          />
        </li>
      </ul>
      <ul class="select-properties__col">
        <li class="select-properties__row">Удалить</li>
        <li
          class="select-properties__row"
          v-for="option in options"
          :key="option.id"
        >
          <button
            @click="emits('deleteOption', option.id)"
            v-if="options.length > 1"
            class="button-minus"
          >
            -
          </button>
        </li>
      </ul> -->
    <div class="select-properties__button">
      <button @click="emits('addOption')" class="button-plus">+</button>
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
}

.button-plus {
  padding: 0 2.5rem;
  width: 100%;
}

.button-minus {
  width: 100%;
}
</style>

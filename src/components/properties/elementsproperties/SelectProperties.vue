<template>
  <div class="select-properties">
    <ul class="select-properties__col select-properties__col--1">
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
    <ul class="select-properties__col select-properties__col--2">
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
    </ul>
    <div class="select-properties__button">
      <button @click="emits('addOption')" class="button-plus">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HasIdName } from "@/types/navigatorTree";

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
  display: grid;
  grid-template-areas:
    "col1 col2"
    "footer footer";
  grid-gap: 1px;
  background: #000;
  border: 1px solid #000;
  font-size: 1.5rem;
  width: 100%;

  &__col {
    background: #fff;
    list-style: none;
    padding: 0;
    color: #000;

    &--1 {
      grid-area: col1;
    }
    &--2 {
      grid-area: col2;
    }
  }

  &__mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;

    &:hover {
      cursor: pointer;
    }
  }

  &__row {
    border-bottom: 1px solid #000;
  }

  &__button {
    grid-area: footer;
    background: #fff;
    display: flex;
    justify-content: flex-end;
  }

  &__input {
    width: 100%;

    &:hover {
      cursor: pointer;
    }

    &--selected {
      background: $light-purple-color;
    }
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

<template>
  <div class="select" ref="target">
    <div class="select__input">
      <UITextField
        :label="label"
        :readonly="true"
        :isSelect="true"
        v-model="selectedOption.name"
        @click="isListOpen = !isListOpen"
      />
      <ArrowIcon
        class="select__icon"
        @click.prevent="isListOpen = !isListOpen"
        :class="{ 'select__icon--rotate': isListOpen }"
      />
    </div>

    <div v-if="isListOpen">
      <ul class="select__list">
        <li
          class="select__list__items"
          v-for="option in options"
          :key="option.id"
          @click="select(option)"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// FUNCTIONS
import { ref, watch } from "vue";
import { v4 } from "uuid";
import { onClickOutside } from "@vueuse/core";
// TYPES
import type { HasIdName } from "@/types/navigatorTree";
// COMPONENTS
import UITextField from "./UITextField.vue";
import ArrowIcon from "../../assets/icons/arrow.svg";

type PropType = {
  options: HasIdName[];
  modelValue: HasIdName | null;
  label: string;
};

type EmitType = {
  (e: "update:modelValue", value: unknown): void;
  (e: "changeItem", value: unknown): void;
};

const props = defineProps<PropType>();
const emit = defineEmits<EmitType>();
const isListOpen = ref(false);
const selectedOption = ref<HasIdName>(props.options[0]);

const select = (option: HasIdName) => {
  emit("update:modelValue", option);
  emit("changeItem", option.name);
  selectedOption.value = option;
  isListOpen.value = false;
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      selectedOption.value = props.modelValue;
    } else {
      selectedOption.value = {
        id: v4(),
        name: "",
      };
    }
  },
  { immediate: true }
);

const target = ref(null);

onClickOutside(target, () => (isListOpen.value = false));
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.select {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #000;
  position: relative;

  &__icon {
    position: absolute;
    right: 0;
    top: 29%;
    cursor: pointer;

    &--rotate {
      rotate: 180deg;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    color: $secondary-font-color;
    position: absolute;
    z-index: 999;
    background: #fff;
    width: 100%;
    box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.25em,
      rgb(90 125 188 / 5%) 0px 0.25em 1em;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-radius: 10px;

    &__items {
      padding: 0.5rem;
      border-bottom: 0.2rem solid $secondary-font-color;

      &:hover {
        cursor: pointer;
        background: #bfd4d4;
      }
    }
  }
}
</style>

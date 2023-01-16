<template>
  <div class="select" ref="target">
    <div class="select__input">
      <input
        type="text"
        readonly
        :value="selectedItem?.name"
        @click="isListOpen = !isListOpen"
      />
      <button class="select__button" @click.prevent="isListOpen = !isListOpen">
        ▼
      </button>
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
import { ref, watch } from "vue";
import type { HasIdName } from "@/types/navigatorTree";
import { onClickOutside } from "@vueuse/core";

type PropType = {
  options: HasIdName[];
  modelValue?: HasIdName;
};

type EmitType = {
  // (e: "update:modelValue", value: unknown): void;
  (e: "changeElement", value: unknown): void;
};

const props = defineProps<PropType>();
const emit = defineEmits<EmitType>();
const isListOpen = ref(false);
const selectedItem = ref<HasIdName | null>(null);

const select = (option: HasIdName) => {
  // emit("update:modelValue", option);
  emit("changeElement", option);
  selectedItem.value = option;
  isListOpen.value = false;
};

watch(
  () => props.modelValue,
  () => {
    selectedItem.value =
      props.options.find(
        (option: HasIdName) => option.name === props.modelValue?.name
      ) || null;
  },
  { immediate: true }
);

const target = ref(null);

onClickOutside(target, (event) => (isListOpen.value = false));
</script>

<style scoped lang="scss">
.select {
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  color: #000;
  position: relative;

  &__input {
    display: flex;
    flex-direction: row;
    position: relative;
  }

  &__button {
    position: absolute;
    right: 0;
    z-index: 1;
    height: 100%;
  }

  &__list {
    list-style: none;
    padding: 0;
    font-size: 1.5rem;
    position: absolute;
    z-index: 999;
    background: #fff;
    width: 100%;

    &__items {
      padding: 0.5rem;
      border-bottom: 1px solid #000;

      &:hover {
        cursor: pointer;
        background: #bfd4d4;
      }
    }
  }
}
</style>

function onClickOutside(target: any, arg1: (event: any) => void) { throw new
Error("Function not implemented."); }

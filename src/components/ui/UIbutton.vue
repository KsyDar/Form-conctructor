<template>
  <button
    :type="selectedFunction"
    class="form-button"
    :class="{ 'form-button--reset': isReset }"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { ButtonType } from "@/types/navigatorTree";
import { ref, watch } from "vue";

type PropType = {
  label: string;
  function?: ButtonType;
};

const props = defineProps<PropType>();

const selectedFunction = ref<"button" | "submit" | "reset">("button");
const isReset = ref<boolean>(false);

watch(
  () => props.function,
  () => {
    if (props.function === ButtonType.SUBMIT) {
      selectedFunction.value = "submit";
      isReset.value = false;
    } else if (props.function === ButtonType.RESET) {
      selectedFunction.value = "reset";
      isReset.value = true;
    } else {
      selectedFunction.value = "button";
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.form-button {
  background-image: linear-gradient(-180deg, #37aee2 0%, #1e96c8 100%);
  border-radius: 5px;
  color: $white-color;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  padding: 1rem 1.75rem;
  text-decoration: none;
  width: 100%;
  border: 0;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-image: linear-gradient(-180deg, #1d95c9 0%, #17759c 100%);
  }

  &--reset {
    color: $primary-font-color;
    background: $white-color;
    border: 1px solid $button-border-color;

    &:hover {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
      background-image: none;
    }
  }
}
</style>

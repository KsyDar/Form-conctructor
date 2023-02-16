<template>
  <button
    :type="selectedFunction"
    class="default-button ui-button"
    :class="{ 'default-button--delete': isReset }"
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
.ui-button {
  width: 100%;
}
</style>

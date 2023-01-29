<template>
  <div class="button-props">
    <UIselect
      :options="functions"
      :label="'Функция'"
      v-model="selectedFunction"
    />
  </div>
</template>

<script setup lang="ts">
import UIselect from "@/components/ui/UIselect.vue";
import { ButtonType } from "@/types/navigatorTree";
import type { HasIdName } from "@/types/navigatorTree";
import { ref, watch } from "vue";
import { v4 } from "uuid";

type EmitType = {
  (e: "changeButton", value: string): void;
};

const emits = defineEmits<EmitType>();

const functions = ref<HasIdName[]>([
  {
    id: v4(),
    name: ButtonType.SUBMIT,
  },
  {
    id: v4(),
    name: ButtonType.RESET,
  },
]);

const selectedFunction = ref<HasIdName>(functions.value[0]);

watch(
  () => selectedFunction.value,
  () => {
    emits("changeButton", selectedFunction.value.name);
  }
);
</script>

<style scoped lang="scss">
.button-props {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>

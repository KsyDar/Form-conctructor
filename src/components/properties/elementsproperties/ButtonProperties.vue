<template>
  <div class="button-props">
    <span>Функция:</span>
    <UIselect :options="functions" v-model="selectedFunction" />
  </div>
</template>

<script setup lang="ts">
import UIselect from "@/components/ui/UIselect.vue";
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
    name: "none",
  },
  {
    id: v4(),
    name: "submit",
  },
  {
    id: v4(),
    name: "reset",
  },
]);

const selectedFunction = ref<string>(functions.value[0].name);

watch(
  () => selectedFunction.value,
  () => {
    emits("changeButton", selectedFunction.value);
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

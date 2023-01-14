<template>
  <input type="checkbox" @change="emits('update:modelValue', !modelValue)" />
  <span>{{ props.label }}</span>
</template>

<script setup lang="ts">
type PropType = {
  label?: string;
  modelValue: boolean;
};

type EmitType = {
  (e: "update:modelValue", value: boolean): void;
};

const props = defineProps<PropType>();
const emits = defineEmits<EmitType>();
</script>

<style scoped lang="scss"></style>

<template>
  <button :type="props.function">{{ label }}</button>
</template>

<script setup lang="ts">
type PropType = {
  label: string;
  function?: "submit" | "reset" | "button";
};

const props = defineProps<PropType>();
</script>

<style scoped lang="scss"></style>

<template>
  <label>
    {{ props.label }}
    <input type="text" :maxlength="props.maxLength" />
  </label>
</template>

<script setup lang="ts">
type PropType = {
  label: string;
  maxLength: string | number;
};

const props = defineProps<PropType>();
</script>

<style scoped lang="scss"></style>

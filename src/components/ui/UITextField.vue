<template>
  <label class="text-field">
    <input
      :class="{ 'text-field__input--select': isSelect }"
      :value="value"
      :placeholder="label"
      :maxlength="maxlength"
      :readonly="readonly"
      class="text-field__input text-field__input--default"
      @change="changeElement"
      @input="onInput"
    />
    <span class="text-field__label text-field__label--default">
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

type PropType = {
  modelValue?: string;
  label: string;
  maxlength?: string;
  readonly?: boolean;
  isSelect?: boolean;
};

interface EmitType {
  (e: "update:modelValue", value: string): void;
  (e: "changed", value: string | null): void;
}

const props = withDefaults(defineProps<PropType>(), {
  modelValue: "",
  maxlength: "30",
  readonly: false,
  isSelect: false,
});
const emit = defineEmits<EmitType>();
const value = ref("");

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === undefined) {
      value.value = props.label;
    } else {
      value.value = props.modelValue;
    }
  },
  { immediate: true }
);

/** событие при завершении редактирования элемента */
const changeElement = () => {
  emit("changed", value.value);
};

/** событие при изменении элемента */
const onInput = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;
  console.log(newValue);

  emit("update:modelValue", newValue);
};
</script>

<style lang="scss">
@use "@/assets/styles/variables" as *;

.text-field {
  position: relative;
  font-weight: 400;
  font-size: 1.2rem;
  margin: 1rem 0 0 0;
  color: $secondary-font-color;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;

  &__input {
    font-weight: 500;
    width: 100%;
    color: black;
    outline: none;
    background-color: transparent;
    padding: 1rem 2.7rem 0.7rem 1rem;
    border: 0;
    border-bottom: 0.2rem solid $secondary-font-color;
    font-size: 1.4rem;

    &.readonly {
      opacity: 0.5;
    }

    &--default {
      &:focus {
        border: 0;
        border-bottom: 0.2rem solid $form-background-color;
        ~ .text-field__label {
          position: absolute;
          bottom: 100%;
          margin-left: 1rem;
          display: block;
          transition: 0.2s;
          font-size: 1.1rem;
          color: $form-background-color;
        }
      }

      &:placeholder-shown ~ .text-field__label {
        font-size: 1.4rem;
        cursor: text;
        bottom: 1rem;
        margin-left: 1rem;
      }
    }

    &--select {
      cursor: pointer !important;
    }

    &::placeholder {
      color: transparent;
      user-select: none;
    }
  }

  &__label {
    font-weight: 500;
    user-select: none;
    line-height: 1;
    transition: 0.2s;

    &--default {
      position: absolute;
      color: $secondary-font-color;
      bottom: 100%;
      margin-left: 1rem;
      display: block;
      font-size: 1.2rem;
    }
  }
}

input:-webkit-autofill {
  -webkit-text-fill-color: #fff;
  box-shadow: 0 0 0 3rem rgb(19, 21, 26) inset !important;
}

input:-webkit-autofill ~ .text-field__label {
  position: absolute;
  bottom: 100%;
  margin-left: 1rem;
  display: block;
  transition: 0.2s;
  font-size: 1.2rem;
}

input:-internal-autofill-selected {
  border: 0;
  border-bottom: 0.1rem solid $secondary-font-color;
}
</style>

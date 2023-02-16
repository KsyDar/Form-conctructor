<template>
  <div
    class="maket-tree__child"
    :class="{
      'maket-tree__child--element': child.type === TreeChildType.ELEMENT,
      'maket-tree__child--selected': child.id === selectedItem?.id,
    }"
    v-for="child in props.tree"
    :key="child.id"
    :style="{ 'flex-direction': getFlexDirection(child.type) }"
  >
    <div
      v-if="child.type === TreeChildType.ELEMENT"
      class="maket-tree__element"
    >
      <component :is="element(child)" v-bind="elementProps(child)" />
    </div>
    <MaketTree
      v-if="child.children?.length !== 0"
      :tree="child.children"
    ></MaketTree>
  </div>
</template>

<script setup lang="ts">
// TYPES
import type { TreeChild } from "@/types/navigatorTree";
import { TreeChildType, TreeElementType } from "@/types/navigatorTree";
import type { FlexDirectionProperty } from "csstype";
// COMPONENTS
import UITextField from "../ui/UITextField.vue";
import UICheckbox from "../ui/UICheckbox.vue";
import UISelect from "../ui/UISelect.vue";
import UIButton from "../ui/UIButton.vue";
import UISpacer from "@/components/ui/UISpacer.vue";
// STORE
import { storeToRefs } from "pinia";
import { useItemsStore } from "@/store/items";

type PropType = {
  tree: Array<TreeChild> | null;
};

const props = defineProps<PropType>();

const getFlexDirection = (childType: TreeChildType): FlexDirectionProperty => {
  let flexDirection: FlexDirectionProperty = "row";
  if (childType === TreeChildType.COL) {
    flexDirection = "column";
  }

  return flexDirection;
};

const element = (element: TreeChild) => {
  if (element.type !== TreeChildType.ELEMENT)
    throw new Error("Ожидался элемент");

  switch (element.value) {
    case TreeElementType.INPUT:
      return UITextField;
    case TreeElementType.CHECKBOX:
      return UICheckbox;
    case TreeElementType.SELECT:
      return UISelect;
    case TreeElementType.BUTTON:
      return UIButton;
    case TreeElementType.SPACER:
      return UISpacer;
  }
};

const elementProps = (element: TreeChild) => {
  if (element.type !== TreeChildType.ELEMENT)
    throw new Error("Ожидался элемент");

  return element.properties;
};

const { selectedItem: selectedItem } = storeToRefs(useItemsStore());
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.maket-tree {
  &__child {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid #000;
    width: 100%;
    min-height: 5rem;

    &--selected {
      border: 0.2rem solid yellow;
    }

    &--element {
      margin: 1rem;

      &:not(.maket-tree__child--selected) {
        border: none;
      }
    }
  }

  &__element {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 1.5rem;
  }
}
</style>

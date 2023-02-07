<template>
  <div
    class="maket-tree__child"
    :class="{
      'maket-tree__child--element': child.type === TreeChildType.ELEMENT,
      'maket-tree__child--selected': child.id === selectedItem?.id,
    }"
    v-for="child in tree"
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
import type { TreeChild } from "@/types/navigatorTree";
import { TreeChildType, TreeElementType } from "@/types/navigatorTree";
import type { FlexDirectionProperty } from "csstype";
import UITextField from "../ui/UITextField.vue";
import UIcheckbox from "../ui/UIcheckbox.vue";
import UIselect from "../ui/UIselect.vue";
import UIbutton from "../ui/UIbutton.vue";
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
  switch (element.value) {
    case TreeElementType.INPUT:
      return UITextField;
    case TreeElementType.CHECKBOX:
      return UIcheckbox;
    case TreeElementType.SELECT:
      return UIselect;
    case TreeElementType.BUTTON:
      return UIbutton;
  }
};

const elementProps = (element: TreeChild) => {
  return element.properties;
};

const { selectedItem: selectedItem } = storeToRefs(useItemsStore());
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.maket-tree {
  &__child {
    display: flex;
    align-items: stretch;
    justify-content: center;
    border: 1px solid #000;
    width: 100%;
    min-height: 5rem;

    &--selected {
      border: 2px solid yellow;
    }

    &--element {
      border: none;
      margin: 1rem;
    }
  }

  &__element {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

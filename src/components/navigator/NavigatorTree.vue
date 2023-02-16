<template>
  <ul v-if="tree">
    <li
      v-for="child in tree"
      :key="child.id"
      class="navigator__item"
      @click.stop="itemsStore.selectItem(child)"
    >
      <span :class="{ 'navigator__item--selected': isSelected(child.id) }">
        {{ child.name }}
      </span>
      <NavigatorTree
        v-if="child.children?.length !== 0"
        :tree="child.children"
      ></NavigatorTree>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useItemsStore } from "@/store/items";
import type { TreeChild } from "@/types/navigatorTree";

type PropType = {
  tree: Array<TreeChild> | null;
};

defineProps<PropType>();

const itemsStore = useItemsStore();

const isSelected = (childId: string) => {
  if (itemsStore.selectedItem) {
    if (childId === itemsStore.selectedItem.id) return true;
  }
  return false;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.navigator__item {
  &:hover {
    cursor: pointer;
  }
  &--selected {
    color: $primary-font-color;
    font-weight: 600;
    text-decoration: underline;
  }
}
</style>

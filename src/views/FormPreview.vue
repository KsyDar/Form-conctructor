<template>
  <button
    class="default-button default-button--delete button-preview"
    @click="goBack"
  >
    Назад
  </button>
  <Maket />
</template>

<script setup lang="ts">
import Maket from "@/components/maket/Maket.vue";
import router from "@/router";
import { useItemsStore } from "@/store/items";
import { onMounted } from "vue";

const itemsStore = useItemsStore();

onMounted(() => {
  itemsStore.selectItem(null);
});
const goBack = () => {
  router.push({ name: "FormConstructor" });
  itemsStore.selectItem(itemsStore.items[0]);
};
</script>

<style scoped lang="scss">
.button-preview {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  max-width: 10rem;
}
</style>

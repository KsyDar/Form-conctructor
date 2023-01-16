import type { HasIdName } from "@/types/navigatorTree";
import { TreeElementType, TreeElementValue } from "@/types/navigatorTree";
import { defineStore } from "pinia";
import { v4 } from "uuid";
import { useItemsStore } from "./items";

type SelectStore = {
  options: HasIdName[];
};

export const useSelectStore = defineStore("select", {
  state: (): SelectStore => {
    const options = [
      {
        id: v4(),
        name: "none",
      },
      {
        id: v4(),
        name: TreeElementValue.INPUT,
      },
      {
        id: v4(),
        name: TreeElementValue.CHECKBOX,
      },
      {
        id: v4(),
        name: TreeElementValue.SELECT,
      },
      {
        id: v4(),
        name: TreeElementValue.BUTTON,
      },
    ];

    const selectedOption = options[0];
    return {
      options,
    };
  },

  // actions: {
  //   updateSelectedOption(option: HasIdName): void {
  //     this.selectedOption = option;
  //   },
  // },

  getters: {
    selectedOption(): HasIdName {
      const itemsStore = useItemsStore();
      if (
        itemsStore.selectedItem &&
        itemsStore.selectedItem.type === TreeElementType.ROW
      ) {
        if (!itemsStore.selectedItem.element) return this.options[0];
        return (
          this.options.find(
            (el) => el.name === itemsStore.selectedItem.element.value
          ) || this.options[0]
        );
      }

      if (
        itemsStore.selectedItem &&
        itemsStore.selectedItem.type === TreeElementType.ELEMENT
      ) {
        return (
          this.options.find(
            (el) => el.name === itemsStore.selectedItem.value
          ) || this.options[0]
        );
      }

      return this.options[0];
    },
  },
});

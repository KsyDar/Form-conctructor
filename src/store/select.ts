import { TreeElementValue, type HasIdName } from "@/types/navigatorTree";
import { defineStore } from "pinia";
import { v4 } from "uuid";

type SelectStore = {
  options: HasIdName[];
  selectedOption: HasIdName;
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
      selectedOption,
    };
  },

  actions: {
    updateSelectedOption(option: HasIdName): void {
      this.selectedOption = option;
    },
  },
});

import type {
  ButtonProps,
  CheckboxProperties,
  InputProperties,
  NavigatorTree,
  SelectProps,
  TreeChild,
  HasIdName,
  Properties,
} from "@/types/navigatorTree";
import { TreeElementType, TreeChildType } from "@/types/navigatorTree";
import { defineStore } from "pinia";
import { v4 } from "uuid";

type ItemsStore = {
  items: TreeChild[];
  selectedItem: TreeChild | null;
};

export const useItemsStore = defineStore("items", {
  state: (): ItemsStore => {
    const localTree = localStorage.getItem("tree");
    const items: TreeChild[] = localTree
      ? JSON.parse(localTree)
      : [
          {
            id: v4(),
            name: "Ребенок 1",
            type: TreeChildType.COL,
            children: [
              {
                id: v4(),
                name: "Новая строка",
                type: TreeChildType.ROW,
                children: [
                  {
                    id: v4(),
                    name: "Новая строка",
                    type: TreeChildType.ROW,
                    children: [],
                  },
                  {
                    id: v4(),
                    name: "Элемент 1",
                    type: TreeChildType.ELEMENT,
                    value: TreeElementType.INPUT,
                    children: [],
                    properties: {
                      maxLength: "20",
                      label: "",
                    },
                  },
                ],
              },
            ],
          },
        ];

    const selectedItem = items[0];
    return {
      items,
      selectedItem,
    };
  },

  actions: {
    addItem(): void {
      const newItem: TreeChild = {
        id: v4(),
        name: "Новый селектор",
        type: TreeChildType.COL,
        children: [],
      };
      if (this.selectedItem) {
        if (this.selectedItem.type === TreeChildType.ELEMENT) return;
        this.selectedItem.children.push(newItem);
      } else {
        this.items.push(newItem);
      }

      this.saveChanges();
    },

    addProperties() {
      const element: TreeChild | null = this.selectedItem;
      if (!element || element.type !== TreeChildType.ELEMENT) return;

      switch (element.value) {
        case TreeElementType.INPUT:
          {
            element.properties = {
              label: element?.properties?.label || "",
              maxLength: "",
            };
          }
          break;
        case TreeElementType.CHECKBOX:
          element.properties = {
            label: element?.properties?.label || "",
            modelValue: false,
          };
          break;
        case TreeElementType.SELECT:
          {
            element.properties = {
              label: element?.properties?.label || "",
              options: [
                {
                  id: v4(),
                  name: "Опция 1",
                },
              ],
              modelValue: null,
            };
            const selectedOption = element.properties.options[0];
            element.properties.modelValue = selectedOption;
          }
          break;
        case TreeElementType.BUTTON:
          element.properties = {
            label: element?.properties?.label || "",
            function: undefined,
          };
          break;
      }
    },

    changeItemType(type: TreeChildType): void {
      if (!this.selectedItem) return;
      this.selectedItem.type = type;

      if (type === TreeChildType.ELEMENT) {
        if (this.selectedItem.children.length !== 0) {
          this.selectedItem.children.length = 0;
        }

        this.selectedItem.value = TreeElementType.INPUT;
        this.addProperties();
        console.log(this.selectedItem.properties);
      }

      this.saveChanges();
    },

    changeElementType(value: TreeElementType): void {
      if (
        !this.selectedItem ||
        this.selectedItem.type !== TreeChildType.ELEMENT
      )
        return;
      this.selectedItem.value = value;
      this.addProperties();
      this.saveChanges();
    },

    deleteItem(): void {
      if (!this.selectedItem) return;
      const selectedItemId = this.selectedItem.id;
      let currentChilds: TreeChild[] | null = null;
      getItem(this.items);

      function getItem(items: TreeChild[]) {
        for (const child of items) {
          if (child.id !== selectedItemId) {
            if (currentChilds) return;
            getItem(child.children);
          } else {
            items.splice(items.indexOf(child), 1);
            currentChilds = items;
          }
        }
      }

      if (currentChilds) {
        this.selectItem(currentChilds[0]);
        this.saveChanges();
      }
    },

    selectItem(item: TreeChild | null): void {
      this.selectedItem = item;
    },

    cleanSelectedItem(): void {
      this.selectedItem = null;
    },

    updateElementProperties(
      newProperties:
        | InputProperties
        | CheckboxProperties
        | SelectProps<HasIdName>
        | ButtonProps
    ): void {
      if (
        this.selectedItem &&
        this.selectedItem.type === TreeChildType.ELEMENT
      ) {
        this.selectedItem.properties = newProperties;
      }

      this.saveChanges();
    },

    selectOption(option: HasIdName): void {
      if (
        this.selectedItem &&
        this.selectedItem.type === TreeChildType.ELEMENT &&
        this.selectedItem.value === TreeElementType.SELECT
      ) {
        this.selectedItem.properties.modelValue = option;
      }
    },

    saveChanges(): void {
      const currentTree = JSON.stringify(this.items);
      localStorage.setItem("tree", currentTree);
    },
  },
});

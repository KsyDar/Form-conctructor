import type {
  ButtonProps,
  CheckboxProperties,
  HasIdName,
  InputProperties,
  SelectProps,
  TreeChild,
} from "@/types/navigatorTree";
import { TreeChildType, TreeElementType } from "@/types/navigatorTree";
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
                    properties: {
                      maxLength: 20,
                      label: "",
                    },
                  },
                ],
              },
            ],
          },
        ];

    const selectedItem = items.length !== 0 ? items[0] : null;
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

      this.selectedItem = newItem;
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
            element.properties.modelValue = element.properties.options[0];
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
      function getParent(
        items: TreeChild[],
        itemId: string,
        parent?: TreeChild
      ): TreeChild | undefined {
        for (const child of items) {
          if (child.id !== itemId) {
            if (child.type === TreeChildType.ELEMENT) continue;
            const foundParent = getParent(child.children, itemId, child);
            if (foundParent) return foundParent;
          } else {
            return parent;
          }
        }
        return undefined;
      }
      const parent = getParent(this.items, this.selectedItem.id);
      if (!parent || parent.type === TreeChildType.ELEMENT) return;
      const index = parent.children.findIndex(
        (item) => item.id === this.selectedItem?.id
      );
      if (type === TreeChildType.ELEMENT) {
        this.selectedItem = {
          id: this.selectedItem.id,
          name: this.selectedItem.name,
          type: type,
          value: TreeElementType.INPUT,
          properties: {
            maxLength: 0,
            label: "",
          },
        };
        this.addProperties();
      } else {
        this.selectedItem = {
          id: this.selectedItem.id,
          name: this.selectedItem.name,
          type: type,
          children:
            this.selectedItem.type !== TreeChildType.ELEMENT
              ? this.selectedItem.children
              : [],
        };
      }
      if (this.selectedItem) {
        parent.children[index] = this.selectedItem;
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
      let currentChild: TreeChild | null = null;
      getItem(this.items);

      function getItem(items: TreeChild[], parent: TreeChild | null = null) {
        for (const child of items) {
          if (child.id !== selectedItemId) {
            if (currentChild || child.type === TreeChildType.ELEMENT) return;
            getItem(child.children, child);
          } else {
            items.splice(items.indexOf(child), 1);
            if (items.length === 0) {
              currentChild = parent;
            } else {
              currentChild = items[0];
            }
          }
        }
      }

      if (currentChild) {
        this.selectItem(currentChild);
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
        this.selectedItem.type === TreeChildType.ELEMENT &&
        this.selectedItem.value !== TreeElementType.SPACER
      ) {
        this.selectedItem.properties = newProperties;
      }

      this.saveChanges();
    },

    selectOption(option: HasIdName): void {
      if (
        this.selectedItem &&
        this.selectedItem.type === TreeChildType.ELEMENT &&
        this.selectedItem.value === TreeElementType.SELECT &&
        this.selectedItem.properties
      ) {
        this.selectedItem.properties.modelValue = option;
      }
    },

    unselectOption(): void {
      if (
        this.selectedItem &&
        this.selectedItem.type === TreeChildType.ELEMENT &&
        this.selectedItem.value === TreeElementType.SELECT &&
        this.selectedItem.properties
      ) {
        this.selectedItem.properties.modelValue = null;
      }
    },

    saveChanges(): void {
      const currentTree = JSON.stringify(this.items);
      localStorage.setItem("tree", currentTree);
    },
  },
});

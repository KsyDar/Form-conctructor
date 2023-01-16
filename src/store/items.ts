import type {
  ButtonProps,
  CheckboxProperties,
  InputProperties,
  NavigatorCol,
  NavigatorRow,
  NavigatorTree,
  SelectProps,
  TreeElement,
  HasIdName,
  Elements,
  Properties,
  NavigatorElement,
} from "@/types/navigatorTree";
import { TreeElementType, TreeElementValue } from "@/types/navigatorTree";
import { defineStore } from "pinia";
import { v4 } from "uuid";

type ItemsStore = {
  items: NavigatorTree;
  selectedItemId: string | null;
};

export const useItemsStore = defineStore("items", {
  state: (): ItemsStore => {
    const localTree = localStorage.getItem("tree");
    const items: NavigatorTree = localTree
      ? JSON.parse(localTree)
      : {
          cols: [
            {
              id: v4(),
              name: "Колонка 1",
              rows: [
                {
                  id: v4(),
                  name: "Строка 1",
                  type: TreeElementType.ROW,
                  element: null,
                },
              ],
              type: TreeElementType.COL,
            },
          ],
        };

    const selectedItemId = items.cols[0].id;
    return {
      items,
      selectedItemId,
    };
  },

  actions: {
    addCol(): void {
      const newRows: NavigatorRow[] = [];
      for (let i = 0; i < this.items.cols[0].rows.length; i++) {
        newRows.push({
          id: v4(),
          name: "Я новая строка",
          type: TreeElementType.ROW,
          element: null,
        });
      }

      const newCol: NavigatorCol = {
        id: v4(),
        name: "Я новая колонка",
        rows: newRows,
        type: TreeElementType.COL,
      };

      this.items.cols.push(newCol);
    },

    addRow(): void {
      this.items.cols.forEach((col) => {
        const newRow: NavigatorRow = {
          id: v4(),
          name: "Я новая строка",
          type: TreeElementType.ROW,
          element: null,
        };
        col.rows.push(newRow);
      });
    },

    addElement(newElement: TreeElementValue) {
      if (this.selectedItem && this.selectedItem.type === TreeElementType.ROW) {
        const element: NavigatorElement = {
          id: v4(),
          name: "Новый элемент",
          type: TreeElementType.ELEMENT,
          value: newElement,
          properties: this.getProperies(null, newElement),
        };
        this.selectedItem.element = element as Elements;

        this.addProperties(element as Elements);
        this.selectItem(element.id);
        this.saveChanges();
      }
    },

    addProperties(element: Elements | null) {
      if (element === null) return;

      switch (element.value) {
        case TreeElementValue.INPUT:
          {
            element.properties = {
              label: "",
              maxLength: "",
            };
          }
          break;
        case TreeElementValue.CHECKBOX:
          element.properties = {
            label: "",
            modelValue: false,
          };
          break;
        case TreeElementValue.SELECT:
          {
            element.properties = {
              label: "",
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
        case TreeElementValue.BUTTON:
          element.properties = {
            label: "",
            function: undefined,
          };
          break;
      }
    },

    deleteCol(): void {
      if (this.items.cols.length > 1) this.items.cols.pop();
    },

    deleteRow(): void {
      this.items.cols.forEach((col) => {
        if (col.rows.length > 1) col.rows.pop();
      });
    },

    deleteElement(): void {
      if (
        this.selectedItem &&
        this.selectedItem.type === TreeElementType.ROW &&
        this.selectedItem.element
      ) {
        this.selectedItem.element = null;
      }

      if (
        this.selectedItem &&
        this.selectedItem.type === TreeElementType.ELEMENT
      ) {
        for (const [index, col] of this.items.cols.entries()) {
          if (!col.rows) return;
          for (const row of this.items.cols[index].rows) {
            if (!row.element) return;
            if (row.element.id === this.selectedItemId) {
              row.element = null;
              this.selectedItemId = this.items.cols[0].id;
            }
          }
        }
      }
    },

    selectItem(itemId: string): void {
      this.selectedItemId = itemId;
    },

    changeElement(newElementValue: TreeElementValue) {
      if (
        this.selectedItem &&
        this.selectedItem.type === TreeElementType.ROW &&
        this.selectedItem.element
      ) {
        if (this.selectedItem.element.value === newElementValue) return;

        this.selectedItem.element.properties = this.getProperies(
          this.selectedItem.element,
          newElementValue
        );
        this.selectedItem.element.value = newElementValue;
        this.selectItem(this.selectedItem.element.id);
      }

      if (
        this.selectedItem &&
        this.selectedItem.type === TreeElementType.ELEMENT
      ) {
        if (this.selectedItem.value === newElementValue) return;

        this.selectedItem.properties = this.getProperies(
          this.selectedItem,
          newElementValue
        );
        this.selectedItem.value = newElementValue;
        this.selectItem(this.selectedItem.id);
      }

      this.saveChanges();
    },

    getProperies(
      element: Elements | null,
      elementValue: TreeElementValue
    ): Properties {
      switch (elementValue) {
        case TreeElementValue.INPUT:
          {
            return {
              label: element?.properties.label || "",
              maxLength: "",
            };
          }
          break;
        case TreeElementValue.CHECKBOX:
          return {
            label: element?.properties.label || "",
            modelValue: false,
          };
          break;
        case TreeElementValue.SELECT:
          {
            const property: SelectProps<HasIdName> = {
              label: element?.properties.label || "",
              options: [
                {
                  id: v4(),
                  name: "Опция 1",
                },
              ],
              modelValue: null,
            };

            const selectedOption = property.options[0];
            property.modelValue = selectedOption;
            return property;
          }
          break;
        case TreeElementValue.BUTTON:
          return {
            label: element?.properties.label || "",
            function: undefined,
          };
          break;
      }
      throw new Error("Не найден тип элемента");
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
        this.selectedItem.type === TreeElementType.ELEMENT
      ) {
        this.selectedItem.properties = newProperties;
      }
    },

    selectOption(option: HasIdName): void {
      if (
        this.selectedItem &&
        this.selectedItem.type === TreeElementType.ELEMENT &&
        this.selectedItem.value === TreeElementValue.SELECT
      ) {
        this.selectedItem.properties.modelValue = option;
      }
    },

    saveChanges(): void {
      const currentTree = JSON.stringify(this.items);
      localStorage.setItem("tree", currentTree);
    },
  },

  getters: {
    colsCounter(): number {
      return this.items.cols.length;
    },
    rowsCounter(): number {
      return this.items.cols[0].rows.length;
    },

    selectedItem(state): TreeElement | null {
      for (const [index, col] of state.items.cols.entries()) {
        if (col.id === state.selectedItemId) return col;
        for (const row of state.items.cols[index].rows) {
          if (row.id === state.selectedItemId) return row;
          if (row.element?.id === state.selectedItemId) return row.element;
        }
      }
      return null;
    },
  },
});

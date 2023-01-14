/**
 * Тип имеющий имя
 */
export interface HasName {
  /** имя  */
  name: string;
}
/**
 * Тип имеющий id
 */
export interface HasId {
  /** идентификатор */
  id: string;
}

/**
 * Тип имеющий id и имя
 */
export type HasIdName = HasId & HasName;

export enum TreeElementType {
  ROW = "row",
  COL = "col",
  ELEMENT = "element",
}

/**
 * Дерево навигации
 */
export type NavigatorTree = {
  /** Колонки */
  cols: NavigatorCol[];
};

/**
 * Колонки в дереве навигации
 */
export interface NavigatorCol<T extends TreeElementType = TreeElementType.COL>
  extends HasName,
    HasId {
  /** строки */
  rows: NavigatorRow[];
  /** тип строки */
  type: T;
}
/**
 * Строки в дереве навигации
 */
export interface NavigatorRow<T extends TreeElementType = TreeElementType.ROW>
  extends HasName,
    HasId {
  /** ui элемент */
  element: Elements | null;
  /** тип строки */
  type: T;
}

export enum TreeElementValue {
  INPUT = "input",
  CHECKBOX = "checkbox",
  SELECT = "select",
  BUTTON = "button",
}

/**
 * UI элемент
 */
export interface NavigatorElement<
  TP extends Properties = Properties,
  TV extends TreeElementValue = TreeElementValue
> extends HasName,
    HasId {
  /** тип строки */
  type: TreeElementType.ELEMENT;
  value: TV;
  properties: TP;
}

export type TreeElement = Elements | NavigatorCol | NavigatorRow;

/**
 * Элементы в дереве навигации
 */
export type Elements =
  | NavigatorElement<InputProperties, TreeElementValue.INPUT>
  | NavigatorElement<CheckboxProperties, TreeElementValue.CHECKBOX>
  | NavigatorElement<SelectProps<HasIdName>, TreeElementValue.SELECT>
  | NavigatorElement<ButtonProps, TreeElementValue.BUTTON>;

export type Properties =
  | InputProperties
  | CheckboxProperties
  | SelectProps<HasIdName>
  | ButtonProps;
/**
 * Тип, имеющий label
 */
export interface HasLabel {
  label: string;
}

/**
 * Свойства элемента текстовое поле
 */
export interface InputProperties extends HasLabel {
  maxLength: string | number;
}

/**
 * Свойства элемента флаг
 */
export interface CheckboxProperties extends HasLabel {
  modelValue: boolean;
}

/**
 * Свойства элемента меню
 */
export interface SelectProps<T extends HasIdName> extends HasLabel {
  options: T[];
  modelValue: T | null;
}

/**
 * Свойства элемента кнопка
 */
export interface ButtonProps extends HasLabel {
  function: "submit" | "reset" | undefined;
}

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

/**
 * Возможные типы частей дерева навигации
 */
export enum TreeChildType {
  ROW = "строка",
  COL = "колонка",
  ELEMENT = "элемент",
}

/**
 * Возможные типы элементов дерева навигации
 */
export enum TreeElementType {
  INPUT = "текстовое поле",
  CHECKBOX = "флаг",
  SELECT = "поле выбора",
  BUTTON = "кнопка",
  SPACER = "разделитель",
}

/**
 * Возможные функции кнопки в форме
 */
export enum ButtonType {
  SUBMIT = "отправить",
  RESET = "сбросить",
}

/**
 * Тип свойств элемента
 */
export type Properties =
  | InputProperties
  | CheckboxProperties
  | SelectProps<HasIdName>
  | ButtonProps
  | SpacerProps;

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
  function: ButtonType | undefined;
}

export interface SpacerProps {
  width: string;
  height: string;
}

/**
 * Часть дерева навигации
 */
export type TreeChild =
  | TreeGroups<TreeChildType.ROW>
  | TreeGroups<TreeChildType.COL>
  | TreeChildGenericElement<TreeElementType.SELECT, SelectProps<HasIdName>>
  | TreeChildGenericElement<TreeElementType.INPUT, InputProperties>
  | TreeChildGenericElement<TreeElementType.CHECKBOX, CheckboxProperties>
  | TreeChildGenericElement<TreeElementType.BUTTON, ButtonProps>
  | TreeSpacer;

export interface TreeGroups<T extends TreeChildType.COL | TreeChildType.ROW>
  extends HasIdName {
  type: T;
  children: TreeChild[];
}

export interface TreeSpacer extends HasIdName {
  type: TreeChildType.ELEMENT;
  value: TreeElementType.SPACER;
}

export interface TreeChildGenericElement<
  T extends Exclude<TreeElementType, TreeElementType.SPACER>,
  P extends Properties
> extends HasIdName {
  type: TreeChildType.ELEMENT;
  value: T;
  properties: P;
}

/**
 * Дерево навигации
 */
export type NavigatorTree = {
  /** Части дерева навигации */
  children: TreeChild[];
};

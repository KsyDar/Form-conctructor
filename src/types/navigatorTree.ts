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
  function: ButtonType | undefined;
}

/**
 * Часть дерева навигации
 */
export interface TreeChild extends HasIdName {
  type: TreeChildType;
  value?: TreeElementType;
  children: TreeChild[];
  properties?: Properties;
}

/**
 * Дерево навигации
 */
export type NavigatorTree = {
  /** Части дерева навигации */
  children: TreeChild[];
};

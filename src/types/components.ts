import { Nullable } from './common';

/**
 * Свойства контейнера.
 */
interface ContainerProps extends React.ComponentPropsWithRef<'div'> {
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  block?: boolean;
}

/**
 * Свойства переключателя состояния списка опций.
 */
interface ToggleProps extends React.ComponentPropsWithRef<'div'> {
  loading?: boolean;
  allowClear?: boolean;
  dropdownIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  onClear?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Свойства выпадающего списка.
 */
interface DropdownProps extends React.ComponentPropsWithRef<'div'> {
  open?: boolean;
}

/**
 * Свойства опции.
 */
interface OptionProps extends React.ComponentPropsWithRef<'li'> {
  key: React.Key;
  selected: boolean;
  disabled: boolean;
  onMouseDown?: React.MouseEventHandler<HTMLElement>;
}

/**
 * Свойства, которые принимает функция рендера содержимого меню.
 */
interface RenderMenuProps<V, O> {
  value: Nullable<V>;
  options: O[]; // Текущие опции, которые могли быть изменены фильтрацией или сортировкой
  originOptions: O[]; // Оригинальные опции, переданные селекту как проп
  // По идее тут должно быть просто open, т.к. useOpen всегда обеспечивает логическое значение
  open?: boolean;
  getOptionProps: (option: O, index: number) => OptionProps;
  hideMenu: () => void;
  onSelect?: (value: V, option: O) => void;
}

/**
 * Свойства, которые принимает функция рендера опции.
 */
interface RenderOptionProps<O> {
  option: O;
  optionProps: OptionProps;
}

export type {
  ContainerProps,
  ToggleProps,
  DropdownProps,
  OptionProps,
  RenderMenuProps,
  RenderOptionProps,
};

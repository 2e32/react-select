import type { Nullable } from './common';
import type { RenderMenuProps, RenderOptionProps } from './components';
import type { ValueContent, OptionKey, OptionContent, OptionValue } from './getter';

/**
 * Свойства селекта.
 *
 * `V` - тип значения. `O` - тип опции.
 */
interface SelectProps<V, O> {
  /**
   * Идентификатор элемента в документе.
   */
  id?: string;
  /**
   * Ссылка для доступа к DOM-узлу компонента.
   */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Текущее значение.
   */
  value?: Nullable<V>;
  /**
   * Отображает текущее значение в поле ввода.
   */
  valueContent?: ValueContent<V>;
  /**
   * Текст-подсказка.
   */
  placeholder?: string;
  /**
   * Список опций.
   */
  options?: O[];
  /**
   * Вычисляет ключ опции (для случая, когда значения опций не уникальны).
   */
  optionKey?: OptionKey<O>;
  /**
   * Отображает значение опции.
   */
  optionContent?: OptionContent<O>;
  /**
   * Вычисляет значение опции, возвращаемое при выборе опции из списка (select).
   */
  optionValue?: OptionValue<O>;
  /**
   * Вычисляет должна ли опция быть отключена (в состоянии `disabled`).
   * @param option Опция из списка.
   * @returns Возвращает `true`, если опция должна быть отключена.
   */
  optionDisabled?: (option: O) => boolean;
  /**
   * Функция для определения равенства текущего значения `value` и опции. Используется:
   * * для определения признака `selected` опции;
   * * для проверки выбора опции (щелчок по опции) - не была ли она выбрана ранее.
   *
   * ⚠️ Используйте `isValueEqualOption` для сравнения `value` и опции, если они в виде объектов или
   * представлены разными типами. По умолчанию они сравниваются с помощью Object.is.
   *
   * @param value Текущее значение.
   * @param option Опция из списка.
   * @returns Возвращает `true`, если `value` и опция соответствуют друг другу.
   */
  isValueEqualOption?: (value: Nullable<V>, option: O) => boolean;
  /**
   * Содержимое, отображаемое в случае, если опции отсутствуют.
   */
  noOptionsContent?: React.ReactNode;
  /**
   * CSS-класс.
   */
  className?: string;
  /**
   * Стиль.
   */
  style?: React.CSSProperties;
  /**
   * Компонент отключен (значение не может быть изменено, получение фокуса запрещено, выпадающие
   * опции скрыты).
   * @default false
   */
  disabled?: boolean;
  /**
   * Компонент только на чтение (значение не может быть изменено, выпадающие опции скрыты).
   * @default false
   */
  readOnly?: boolean;
  /**
   * Компонент должен находится в фокусе при монтировании.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Отображать кнопку очистки значения селекта.
   * @default false
   */
  allowClear?: boolean;
  /**
   * Компонент занимает всю ширину контейнера.
   * @default false
   */
  block?: boolean;
  /**
   * Отображать индикатор загрузки.
   * @default false
   */
  loading?: boolean;
  /**
   * Отображать список опций. Используется для ручного управления отображением списка опций.
   * @default undefined
   */
  open?: boolean;
  /**
   * Начальное значение для отображения списка опций. Используется при неконтролируемом управлении
   * отображением списка опций.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Скрывать список опций после выбора значения из него.
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * Скрывать список опций при щелчке вне компонента.
   * @default true
   */
  closeOnClickOutside?: boolean;
  /**
   * Разрешить отменять выбор значения в опциях.
   * @default false
   */
  allowDeselect?: boolean;
  /**
   * Иконка состояния выпадающего списка (открыт или закрыт).
   */
  dropdownIcon?: React.ReactNode;
  /**
   * Иконка индикатора загрузки.
   */
  loadingIcon?: React.ReactNode;
  /**
   * Иконка очистки содержимого компонента.
   */
  clearIcon?: React.ReactNode;
  /**
   * Иконка перед содержимым компонента.
   */
  prependIcon?: React.ReactNode;
  /**
   * Иконка после содержимого компонента.
   */
  appendIcon?: React.ReactNode;
  /**
   * Фильтрует опции.
   * @param option Опция.
   * @returns Если функция вернет `true`, то опция будет включена в список опций, иначе опция
   * будет исключена из него.
   */
  filter?: (option: O) => boolean;
  /**
   * Сортирует опции.
   * @param optionA Первая опция для сравнения.
   * @param optionB Вторая опция для сравнения.
   * @returns Возвращает число, знак которого указывает на относительный порядок этих опций.
   */
  sort?: (optionA: O, optionB: O) => number;
  /**
   * Отображает содержимое выпадающего списка.
   *
   * ⚠️ Используйте это свойство:
   * * для ручного вывода списка согласно бизнес логике;
   * * для собственной стилизации списка;
   * * для наделения меню дополнительным функционалом (добавление элементов, поиск и т.п.).
   */
  renderMenu?: (props: RenderMenuProps<V, O>) => React.ReactNode;
  /**
   * Отображает опцию.
   *
   * ⚠️ Используйте это свойство:
   * * для собственной стилизации элемента списка;
   * * для наделения элемента дополнительным функционалом.
   */
  renderOption?: (props: RenderOptionProps<O>) => React.ReactNode;
  /**
   * Отображает пустую опцию.
   *
   * ⚠️ Используйте это свойство:
   * * для собственной стилизации пустой опции;
   * * для наделения элемента дополнительным функционалом (добавление новой опции и т.п.).
   */
  renderEmptyOption?: () => React.ReactNode;
  /**
   * Вызывается при отображении списка опций.
   */
  onOpen?: () => void;
  /**
   * Вызывается при скрытии списка опций.
   */
  onClose?: () => void;
  /**
   * Вызывается при изменении видимости списка опций.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Вызывается при выборе значения из опций.
   */
  onSelect?: (value: V, option: O) => void;
  /**
   * Вызывается при отмене выбора значения в опциях.
   */
  onDeselect?: (value: V, option: O) => void;
  /**
   * Вызывается при очистке значения.
   */
  onClear?: (value: V) => void;
  /**
   * Вызывается при изменении значения (select, deselect, clear).
   */
  onChange?: (value: V | null) => void;

  // Стандартные обработчики событий

  // Мышь
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

  // Клавиатура
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;

  // Фокус
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

/**
 * Сигнатура компонента. Select - это функция вида `(props: SelectProps, ref) => JSX.Element`.
 */
type SelectComponent = <V, O>(
  props: SelectProps<V, O>,
  ref: React.Ref<HTMLDivElement>
) => JSX.Element;

export type { SelectProps, SelectComponent };

import type { Nullable, ValueContent, OptionKey, OptionContent, OptionValue } from '../types';

import { isString, isNumber, isFunction } from './checkType';

/**
 * Получает ключ опции.
 */
export const getOptionKey = <T>(option: T, index: number, getter?: OptionKey<T>) => {
  if (isString(getter)) return option[getter] as React.Key;
  if (isFunction(getter)) return getter(option, index);

  if (isString(option) || isNumber(option)) return option;

  return index;
};

/**
 * Получает значение опции.
 */
export const getOptionValue = <T>(option: T, getter?: OptionValue<T>) => {
  if (isString(getter)) return option[getter];
  if (isFunction(getter)) return getter(option);

  return option;
};

/**
 * Получает отображаемое содержимое опции.
 */
export const getOptionContent = <T>(option: T, index: number, getter?: OptionContent<T>) => {
  if (isString(getter)) return option[getter] as React.ReactNode;
  if (isFunction(getter)) return getter(option, index);

  if (isString(option) || isNumber(option)) return option;

  // Избагаем ошибку React "Object are not valid as a React child", если option, например, объект
  return JSON.stringify(option);
};

/**
 * Получает отображаемое содержимое значения.
 */
export const getValueContent = <T>(value: Nullable<T>, getter?: ValueContent<T>) => {
  if (value == null) return null;

  if (isString(getter)) return value[getter] as React.ReactNode;
  if (isFunction(getter)) return getter(value);

  if (isString(value) || isNumber(value)) return value;

  // Избагаем ошибку React "Object are not valid as a React child", если value, например, объект
  return JSON.stringify(value);
};

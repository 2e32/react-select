export const isString = (str: unknown): str is string => typeof str === 'string';

export const isNumber = (num: unknown): num is number => typeof num === 'number';

export const isBoolean = (bool: unknown): bool is boolean => typeof bool === 'boolean';

export const isNil = (value: unknown) => value == null;

export const isFunction = (fn: unknown): fn is (...args: never) => unknown =>
  typeof fn === 'function';

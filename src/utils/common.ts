import type { Nullable } from '../types';

export const isSameValue = <T, O>(value: Nullable<T>, option: O) => Object.is(value, option);

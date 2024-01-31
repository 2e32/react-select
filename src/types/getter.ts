// Может быть ключом объекта или функцией извлечения

type ValueContent<V> = keyof V | ((value: V) => React.ReactNode);
type OptionKey<O> = keyof O | ((option: O, index: number) => React.Key);
type OptionContent<O> = keyof O | ((option: O, index: number) => React.ReactNode);
type OptionValue<O> = keyof O | ((option: O) => unknown);

export type { ValueContent, OptionKey, OptionContent, OptionValue };

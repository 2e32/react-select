import { useState, useCallback } from 'react';

interface UseControlledProps<T> {
  controlledValue?: T;
  defaultUncontrolledValue?: T;
}

// Значение и функция его изменения, возвращаемые в виде массива (аналогично useState).
type UseControlledResult<T> = [T | undefined, (newValue: T) => void];

const useControlled = <T>(props: UseControlledProps<T>): UseControlledResult<T> => {
  const { controlledValue, defaultUncontrolledValue } = props;

  // Внутреннее значение используется, если нет внешнего
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultUncontrolledValue);

  // Значение контролируемое, если оно передано явно
  const isControlled = controlledValue !== undefined;

  // Если значение контролируемое, то возвращаем его, иначе внутреннее значение
  const value = isControlled ? controlledValue : uncontrolledValue;

  // Обновлять значение можем только у внутреннего значение.
  // Обновление контролируемого значения происходит "снаружи".
  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) setUncontrolledValue(newValue);
    },
    [isControlled]
  );

  return [value, setValue];
};

export type { UseControlledProps, UseControlledResult };

export default useControlled;

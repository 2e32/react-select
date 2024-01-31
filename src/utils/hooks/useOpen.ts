import useControlled from './useControlled';

interface UseOpenProps {
  open?: boolean;
  defaultOpen?: boolean;
}

/**
 * Хук для управления состоянием отображается / скрыто.
 *
 * @description Если передано значение `open`, то это контролируемое управление состоянием и его
 * изменение должно происходить из вне. Иначе компонент обладает своим собственным (внутренним)
 * состоянием и функцией его изменения.
 *
 * @param {UseOpenProps} props Свойства хука.
 * @param props.open Начальное значение для управляемого состояния open.
 * @param props.defaultOpen Начальное значение для неуправляемого состояния open.
 * @returns Возвращает текущее состояние open и функцию его изменения.
 */
const useOpen = ({ open, defaultOpen }: UseOpenProps) => {
  return useControlled({
    controlledValue: open,
    defaultUncontrolledValue: defaultOpen,
  });
};

export type { UseOpenProps };

export default useOpen;

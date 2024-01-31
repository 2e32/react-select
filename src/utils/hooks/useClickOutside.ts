import { useEffect, useRef } from 'react';

import { isFunction } from '../checkType';

interface UseClickOutsideProps {
  isClickOutside: (e: MouseEvent) => boolean;
  onClickOutside?: ((e: MouseEvent) => void) | null;
}

/**
 * Хук для отслеживания щелчка за пределами элемента и реагирования на это.
 *
 * @param {UseClickOutsideProps} props Свойства хука.
 * @param props.isClickOutside Функция, определяющая что событие щелчка произошло за пределами.
 * @param props.onClickOutside Функция-обработчик, вызываемая, если щелчок был за пределами.
 */
const useClickOutside = ({ isClickOutside, onClickOutside }: UseClickOutsideProps) => {
  const isOutsideRef = useRef(isClickOutside);
  const handleClickRef = useRef(onClickOutside);

  useEffect(() => {
    isOutsideRef.current = isClickOutside;
    handleClickRef.current = onClickOutside;
  }, [isClickOutside, onClickOutside]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const handler = handleClickRef.current;

      if (isOutsideRef.current?.(e) && isFunction(handler)) handler(e);
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};

export type { UseClickOutsideProps };

export default useClickOutside;

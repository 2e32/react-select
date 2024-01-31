import { forwardRef } from 'react';
import cn from 'classnames';

import type { ContainerProps } from '../types';

const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const {
    className,
    disabled = false,
    readOnly = false,
    loading = false,
    block = false,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cn('e-select', className, {
        'e-select--disabled': disabled,
        'e-select--readonly': readOnly && !disabled,
        'e-select--loading': loading,
        'e-select--block': block,
      })}
      {...rest}
    />
  );
});

Container.displayName = 'Container';

export default Container;

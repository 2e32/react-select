import { forwardRef } from 'react';
import cn from 'classnames';

import type { DropdownProps } from '../types';

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const { open = false, className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn('e-select__dropdown', className, {
        'e-select__dropdown--hidden': !open,
      })}
      {...rest}
    />
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;

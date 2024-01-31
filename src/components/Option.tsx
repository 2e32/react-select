import cn from 'classnames';

import type { OptionProps } from '../types';

const Option = (props: OptionProps) => {
  const { selected = false, disabled = false, className, ...rest } = props;

  return (
    <li
      {...rest}
      className={cn('e-select__item', className, {
        'e-select__item--selected': selected,
        'e-select__item--disabled': disabled,
      })}
    />
  );
};

export default Option;

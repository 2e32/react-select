import { ComponentPropsWithoutRef } from 'react';

const EmptyOption = ({ children = 'No options', ...rest }: ComponentPropsWithoutRef<'li'>) => (
  <li className="e-select__empty" {...rest}>
    {children}
  </li>
);

export default EmptyOption;

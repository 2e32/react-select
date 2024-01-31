import { forwardRef } from 'react';
import cn from 'classnames';

import type { ToggleProps } from '../types';

import { useIcons } from '../utils/hooks';

const ActionButton = (props: React.ComponentPropsWithoutRef<'button'>) => (
  <button {...props} tabIndex={-1} className="e-select__action" />
);

const Toggle = forwardRef<HTMLDivElement, ToggleProps>((props, ref) => {
  const {
    children,
    loading = false,
    allowClear = false,
    className,
    dropdownIcon: dropdownIconProp,
    loadingIcon: loadingIconProp,
    clearIcon: clearIconProp,
    prependIcon,
    appendIcon,
    onClear,
    ...rest
  } = props;

  const { dropdownIcon, loadingIcon, clearIcon } = useIcons({
    dropdownIcon: dropdownIconProp,
    loadingIcon: loadingIconProp,
    clearIcon: clearIconProp,
  });

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Предотвращаем потерю фокуса для Toogle

    onClear?.(e);
  };

  const handleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Предотвращаем потерю фокуса для Toogle
  };

  return (
    <div ref={ref} className={cn('e-select__box', className)} {...rest}>
      {prependIcon && <div className="e-select__prepend-inner">{prependIcon}</div>}

      <div className="e-select__value">{children}</div>

      <div className="e-select__append-inner">
        {appendIcon}
        {loading && loadingIcon}
        {allowClear && <ActionButton onMouseDown={handleClear}>{clearIcon}</ActionButton>}
        <ActionButton onMouseDown={handleDropdown}>{dropdownIcon}</ActionButton>
      </div>
    </div>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;

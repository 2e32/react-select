import { isString, isBoolean, isNil } from '../utils';

const hasPlaceholder = (value: React.ReactNode) => {
  if (isNil(value)) return false;
  if (isString(value)) return value.trim().length !== 0;
  if (isBoolean(value)) return false;

  return true;
};

const Placeholder = ({ children, ...rest }: React.ComponentPropsWithoutRef<'span'>) => {
  return hasPlaceholder(children) ? (
    <span className="e-select__placeholder" {...rest}>
      {children}
    </span>
  ) : null;
};

export default Placeholder;

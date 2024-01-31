import cn from 'classnames';

const OptionList = (props: React.ComponentPropsWithoutRef<'ul'>) => {
  const { className, ...rest } = props;

  return <ul className={cn('e-select__items', className)} {...rest} />;
};

export default OptionList;

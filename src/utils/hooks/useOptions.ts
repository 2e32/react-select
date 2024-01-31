import { useMemo } from 'react';

import { isFunction } from '../checkType';

interface UseOptionsProps<O> {
  options?: O[];
  filter?: (option: O) => boolean;
  sort?: (optionA: O, optionB: O) => number;
}

const useOptions = <O>({ options, filter, sort }: UseOptionsProps<O>) => {
  // Чтобы исключить вычисление опций при изменении любого пропа в селекте, реагируем на те что надо
  return useMemo(() => {
    if (!Array.isArray(options)) return [];
    if (options.length === 0) return options;

    const hasFilter = isFunction(filter);
    const hasSort = isFunction(sort);

    if (!hasFilter && !hasSort) return options;

    let cloned = options.slice();

    if (hasFilter) cloned = cloned.filter(filter);
    if (hasSort) cloned.sort(sort);

    return cloned;
  }, [options, filter, sort]);
};

export type { UseOptionsProps };

export default useOptions;

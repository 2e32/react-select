import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

import type { SelectComponent, SelectProps } from './types';

import { KEYBOARD_CODE, DROPDOWN_OFFSET_Y } from './consts';
import {
  Container,
  Toggle,
  Placeholder,
  Dropdown,
  OptionList,
  Option,
  EmptyOption,
} from './components';
import {
  getValueContent,
  getOptionKey,
  getOptionContent,
  getOptionValue,
  isSameValue,
  hooks,
} from './utils';

const { useOpen, useOptions, useClickOutside } = hooks;

const Select = <V, O>(props: SelectProps<V, O>, ref: React.Ref<HTMLDivElement>) => {
  const {
    value,
    valueContent,
    placeholder,
    options: optionsProp = [],
    optionKey,
    optionContent,
    optionValue,
    optionDisabled,
    isValueEqualOption,
    noOptionsContent = 'No options',
    disabled = false,
    readOnly = false,
    autoFocus = false,
    allowClear = false,
    loading = false,
    open: openProp,
    defaultOpen = false,
    closeOnSelect = true,
    closeOnClickOutside = true,
    allowDeselect = false,
    dropdownIcon,
    loadingIcon,
    clearIcon,
    prependIcon,
    appendIcon,
    filter,
    sort,
    renderMenu,
    renderOption,
    renderEmptyOption,
    onOpen,
    onClose,
    onOpenChange,
    onSelect,
    onDeselect,
    onClear,
    onChange,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const [open, setOpen] = useOpen({ open: openProp, defaultOpen });
  const options = useOptions<O>({ options: optionsProp, filter, sort });

  // Одновременно храним ссылку на toggle в ref и state
  // toggleNode нужен для решения проблемы с отступом между toggle и dropdown при renderEmptyOption
  // Почему-то при renderEmptyOption toggleRef не заполняется и по этому отступ неверно вычисляется
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const [toggleNode, setToggleNode] = useState<HTMLDivElement | null>();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasValue = value != null;
  const tabIndex = disabled ? undefined : 0; // При readOnly может получать фокус
  const inactive = disabled || readOnly;
  const showClearButton = hasValue && allowClear && !inactive && !loading;
  const showEmptyOption = !!noOptionsContent;

  const isEqual = isValueEqualOption ?? isSameValue;

  useEffect(() => {
    if (autoFocus) toggleRef.current?.focus();
  }, [autoFocus]);

  const setToggleRef = useCallback((element: HTMLDivElement | null) => {
    toggleRef.current = element;

    setToggleNode(element);
  }, []);

  // Вычисление отступа между toggle и dropdown
  const toggleHeight = toggleNode?.clientHeight ?? 0;
  const dropdownStyle = useMemo(() => ({ top: toggleHeight + DROPDOWN_OFFSET_Y }), [toggleHeight]);

  const handleToggleClick = useCallback(() => {
    if (open) onClose?.();
    else onOpen?.();

    const newState = !open;
    onOpenChange?.(newState);

    setOpen(newState);
  }, [open, onOpen, onClose, onOpenChange, setOpen]);

  const handleToggleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if ([KEYBOARD_CODE.ENTER, KEYBOARD_CODE.NUM_ENTER].includes(e.code)) {
        handleToggleClick();
      } else if (e.code === KEYBOARD_CODE.TAB) {
        const isFocused = document.activeElement === toggleRef.current;

        if (open && isFocused) {
          setOpen(false);
          onClose?.();
          onOpenChange?.(false);
        }
      }
    },
    [open, setOpen, handleToggleClick, onClose, onOpenChange]
  );

  const handleClear = useCallback(() => {
    if (hasValue) {
      onClear?.(value);
      onChange?.(null);
    }
  }, [value, hasValue, onClear, onChange]);

  const isClickOutside = useCallback((e: MouseEvent) => {
    const node = e.target as Node;

    const toggleHasChild = toggleRef.current?.contains(node);
    const dropdownHasChild = dropdownRef.current?.contains(node);

    return !toggleHasChild && !dropdownHasChild;
  }, []);

  const handleClickOutside = useCallback(() => {
    if (closeOnClickOutside && open) {
      setOpen(false);
      onClose?.();
      onOpenChange?.(false);

      toggleRef.current?.blur();
    }
  }, [open, closeOnClickOutside, setOpen, onClose, onOpenChange]);

  useClickOutside({ isClickOutside, onClickOutside: handleClickOutside });

  const handleOptionClick = (option: O, e: React.MouseEvent<HTMLElement>) => {
    // Предтвращаем потерю фокуса с Toggle (остановка onBlur и сохранение визуального выделения)
    e.preventDefault();

    if (!isEqual(value, option)) {
      const selectedValue = getOptionValue(option, optionValue) as V;

      onSelect?.(selectedValue, option);
      onChange?.(selectedValue);
    } else {
      if (hasValue && allowDeselect) {
        onDeselect?.(value, option);
        onChange?.(null);
      }
    }

    if (closeOnSelect) {
      onClose?.();
      onOpenChange?.(false);
      setOpen(false);
    }
  };

  const getOptionProps = (option: O, index: number) => {
    const key = getOptionKey(option, index, optionKey);
    const isActive = isEqual(value, option);
    const isDisabled = optionDisabled ? optionDisabled(option) : false;

    return {
      key,
      selected: isActive,
      disabled: isDisabled,
      // Не используйте onClick, т.к. произойдет потеря фокуса у Toggle при щелчке по опции
      // Toggle onBlur -> onClick (prevent blur будет предотвращаться уже после случившегося onBlur)
      onMouseDown: isDisabled
        ? undefined
        : (e: React.MouseEvent<HTMLElement>) => handleOptionClick(option, e),
    };
  };

  let dropdownContent;

  if (renderMenu) {
    const renderMenuProps = {
      value,
      options,
      originOptions: optionsProp,
      open,
      getOptionProps,
      hideMenu: () => setOpen(false),
      onSelect,
    };

    dropdownContent = renderMenu(renderMenuProps);
  } else {
    let renderedOptions;

    if (options.length) {
      renderedOptions = options.map((option, index) => {
        const optionProps = getOptionProps(option, index);

        return renderOption ? (
          renderOption({ option, optionProps })
        ) : (
          <Option {...optionProps} key={optionProps.key}>
            {getOptionContent(option, index, optionContent)}
          </Option>
        );
      });

      dropdownContent = <OptionList>{renderedOptions}</OptionList>;
    } else {
      if (renderEmptyOption) dropdownContent = <OptionList>{renderEmptyOption()}</OptionList>;
      else {
        dropdownContent = showEmptyOption ? (
          <OptionList>
            <EmptyOption>{noOptionsContent}</EmptyOption>
          </OptionList>
        ) : null;
      }
    }
  }

  return (
    <Container ref={ref} disabled={disabled} readOnly={readOnly} loading={loading} {...rest}>
      <Toggle
        ref={setToggleRef}
        tabIndex={tabIndex}
        loading={loading}
        allowClear={showClearButton}
        dropdownIcon={dropdownIcon}
        loadingIcon={loadingIcon}
        clearIcon={clearIcon}
        prependIcon={prependIcon}
        appendIcon={appendIcon}
        onClick={disabled ? undefined : handleToggleClick}
        onKeyDown={disabled ? undefined : handleToggleKeyDown}
        onClear={handleClear}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {getValueContent(value, valueContent) ?? <Placeholder>{placeholder}</Placeholder>}
      </Toggle>

      <Dropdown ref={dropdownRef} open={inactive ? false : open} style={dropdownStyle}>
        {dropdownContent}
      </Dropdown>
    </Container>
  );
};

export default React.forwardRef(Select) as SelectComponent;

import { ArrowIcon, ClearIcon, LoadingIcon } from '../../components';

interface UseIconsProps {
  dropdownIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
}

const useIcons = ({ dropdownIcon, loadingIcon, clearIcon }: UseIconsProps) => ({
  dropdownIcon: dropdownIcon ?? (
    <ArrowIcon height="18px" fill="var(--e-colors-darkgray-lighten-70)" />
  ),
  loadingIcon: loadingIcon ?? <LoadingIcon />,
  clearIcon: clearIcon ?? <ClearIcon height="18px" className="e-select__clear" />,
});

export type { UseIconsProps };

export default useIcons;

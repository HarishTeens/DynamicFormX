import ReactSelect, {
  ControlProps,
  GroupBase,
  PlaceholderProps,
  Props
} from 'react-select';

import { useGenerateUniqueId } from '~/hooks/useGenerateUniqueId';

import { ISelectOption } from './types';

const CustomPlaceholder = <
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>(
  props: PlaceholderProps<OptionType, IsMulti, GroupType>
) => {
  return (
    <div
      className={`
					absolute left-1 text-error ${props.getClassNames('placeholder', props) || 'text-secondary-text'}
          ${props.isFocused
          ? `top-2 -translate-y-4 scale-75`
          : `top-1/2 -translate-y-1/2 scale-100`
        }
					px-2 border-0 duration-300 transform text-sm bg-white z-10 origin-[0] `}
      {...props.innerProps}
    >
      {props.children}
    </div>
  );
};

interface SelectProps
  extends Props<ISelectOption, boolean, GroupBase<ISelectOption>> {
  indicator?: 'error' | 'success' | 'warning' | 'info';
}
export type IReactSelectOnChange = Props<ISelectOption, boolean, GroupBase<ISelectOption>>["onChange"]

const Select = ({
  isClearable = true,
  isSearchable = false,
  value,
  onChange,
  indicator,
  ...rest
}: SelectProps) => {
  const uniqueId = useGenerateUniqueId("select");

  const indicatorColorClasses = {
    error: "border-error focus:border-error",
    success: "border-success focus:border-success",
    warning: "border-warning focus:border-warning",
    info: "border-success focus:border-info",
  };

  const indicatorTextClasses = {
    error: "text-error",
    success: "text-success",
    warning: "text-warning",
    info: "text-success",
  };


  const controlState = (state: ControlProps<ISelectOption, boolean, GroupBase<ISelectOption>>) => {
    if (state.isFocused) {
      return `border-primary outline-none`
    }

    if (indicator) {
      return indicatorColorClasses[indicator]
    }

    return "border-light"

  }

  return (
    <ReactSelect
      id={uniqueId}
      isClearable={isClearable}
      isSearchable={isSearchable}
      value={value}
      onChange={onChange}
      placeholder=''
      components={{
        Placeholder: CustomPlaceholder,
      }}
      classNames={{
        control: controlState,
        valueContainer: () => `px-2.5 overflow-visible h-12`,
        container: () => `overflow-visible outline-none`,
        indicatorSeparator: () => `bg-transparent`,
        input: () => "p-0 m-0 text-sm text-primary-text",
        placeholder: () => indicator ? indicatorTextClasses[indicator] : ''
      }}
      {...rest}
    />
  );
};

export default Select;

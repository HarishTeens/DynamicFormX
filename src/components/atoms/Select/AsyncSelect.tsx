import { ControlProps, GroupBase, PlaceholderProps } from "react-select";
import AsyncReactSelect, { AsyncProps } from "react-select/async";

import { useGenerateUniqueId } from "~/hooks/useGenerateUniqueId";

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
					absolute left-1  ${props.getClassNames('placeholder',props) || 'text-secondary-text'}
          ${
            props.isFocused
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

interface CustomAsyncSelectProps<OptionType, IsMulti extends boolean, GroupType extends GroupBase<OptionType> = GroupBase<OptionType>> extends AsyncProps<OptionType, IsMulti, GroupType> {
  // Add an indicator prop with a specific type
  indicator?: "error" | "success" | "warning" | "info";
}



const AsyncSelect = <
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  isClearable = true,
  isSearchable = true,
  value,
  onChange,
  indicator,
  ...rest
}: CustomAsyncSelectProps<OptionType, IsMulti, GroupType>) => {
  const uniqueId = useGenerateUniqueId("async-select");

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

  const controlState = (state: ControlProps<OptionType, IsMulti, GroupType>) => {
    if( state.isFocused ){
      return `border-primary outline-none`
    }
    
    if(indicator){
      return indicatorColorClasses[indicator]
    }

    return "border-light"

  }



  return (
    <AsyncReactSelect
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
        valueContainer: () => `px-2.5 pb-2.5 pt-4 overflow-visible`,
        container: () => `overflow-visible outline-none`,
        indicatorSeparator: () => `bg-transparent`,
        placeholder: () => indicator ? indicatorTextClasses[indicator] : ''
      }}
      {...rest}
    />
  );
};

export default AsyncSelect;
 
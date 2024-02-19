import React from 'react';

import { useGenerateUniqueId } from '~/hooks/useGenerateUniqueId';
import { convertString } from '~/utils/utils';

export interface IInputProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  helperText?: React.ReactNode;
  indicator?: "error" | "success" | "warning" | "success";
  labelClassName?: string;
  inputClassName?: string;
  helperTextClassName?: string;
  containerClassName?: string;
  placeholder?: string;
  id?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  onBlur?: React.InputHTMLAttributes<HTMLInputElement>["onBlur"];
  onKeyDown?: React.InputHTMLAttributes<HTMLInputElement>["onKeyDown"];
  decoration?: 'uppercase' | 'lowercase' | null
}

const Input: React.FC<IInputProps> = ({
  placeholder,
  id,
  indicator,
  labelClassName,
  inputClassName,
  containerClassName,
  startIcon,
  endIcon,
  inputProps,
  value,
  onChange,
  onBlur,
  onKeyDown,
  decoration,
  helperText,
  helperTextClassName,
}) => {
  const uniqueId = useGenerateUniqueId("input");

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if(inputProps && inputProps.type === "number"){
  //     if(inputProps?.min !== undefined && Number(e.target.value) < Number(inputProps?.min)) e.target.value = inputProps?.min.toString();
  //     if(inputProps?.max !== undefined && Number(e.target.value) > Number(inputProps?.max)) e.target.value = inputProps?.max.toString();
  //   }
  //   console.log('val', Number(inputProps?.min),  Number(e.target.value));
  //   if(onChange_) onChange_(e);
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = convertString(e.target.value, decoration as string)
    if (onChange) onChange(e);
  }

  const indicatorColorClasses = {
    error: "border-error text-error focus:border-error",
    success: "border-success text-success focus:border-success",
    warning: "border-warning text-warning focus:border-warning",
    info: "border-success text-info focus:border-info",
  };

  return (
    <div className={`bg-secondary-bg ${containerClassName}`}>
      <div className='relative'>
        {startIcon ? (
          <div className='absolute inset-y-0 left-0 z-[10] flex items-center pl-3'>
            {startIcon}
          </div>
        ) : (
          <></>
        )}

        <input
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          type='text'
          id={id || uniqueId}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm  rounded-rg border relative z-[0]
					${indicator
              ? indicatorColorClasses[indicator]
              : "text-primary-text border-one focus:border-primary"
            }
					appearance-none focus:outline-none focus:ring-0 peer
					${startIcon ? "pl-10" : ""}
					${endIcon ? "pr-10" : ""} ${inputClassName}`}
          placeholder=' '
          {...inputProps}
        />

        {endIcon ? (
          <div className='absolute inset-y-0 right-0 z-[10] flex items-center pr-3'>
            {endIcon}
          </div>
        ) : (
          <></>
        )}

        <label
          htmlFor={id || uniqueId}
          className={`
					absolute
					${startIcon ? "left-7" : "left-1"}
					top-2 peer-focus:top-2 peer-placeholder-shown:top-1/2
					-translate-y-4 peer-focus:-translate-y-4 peer-placeholder-shown:-translate-y-1/2
					scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100
					px-2 peer-focus:px-2
					border-0 duration-300 transform text-sm bg-white z-10 origin-[0]
					${indicator ? indicatorColorClasses[indicator] : "text-secondary-text"}
					${labelClassName}`}
        >
          {placeholder}
        </label>
      </div>
      {helperText ? (
        <p
          id='outlined_helper_text'
          className={`mt-2 text-xs border-0 ${indicator ? indicatorColorClasses[indicator] : "text-secondary-text"
            } ${helperTextClassName}`}
        >
          {helperText}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;

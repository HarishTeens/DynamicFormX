import React, { ChangeEvent } from 'react'
import { useGenerateUniqueId } from '~/hooks/useGenerateUniqueId';

export interface ITextAreaProps {
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
    inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    value?: React.TextareaHTMLAttributes<HTMLInputElement>["value"];
    handleChange?: (value: string) => void;
  }


const TextArea:React.FC<ITextAreaProps> = ({
    placeholder,
    id,
    indicator,
    helperText,
    labelClassName,
    inputClassName,
    helperTextClassName,
    containerClassName,
    startIcon,
    endIcon,
    inputProps,
    value,
    handleChange,
  }) => {

    const uniqueId = useGenerateUniqueId("textarea");

    const indicatorColorClasses = {
        error: "border-error text-error focus:border-error",
        success: "border-success text-success focus:border-success",
        warning: "border-warning text-warning focus:border-warning",
        info: "border-success text-info focus:border-info",
      };


      const onChangeText = (value:string ) => {
        handleChange && handleChange(value);
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
    
            <textarea
              value={value}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChangeText(e.target.value)}
              id={id || uniqueId}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm  rounded-rg border relative z-[0]
                        ${
                indicator
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
              className={`mt-2 text-xs border-0 ${
                indicator ? indicatorColorClasses[indicator] : "text-secondary-text"
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

export default TextArea
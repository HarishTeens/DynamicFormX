import React, { useRef, useState, useEffect } from 'react';
import { useGenerateUniqueId } from '~/hooks/useGenerateUniqueId';

export interface ISliderProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label?: string;
    description?: string;
    containerClassName?: string;
    inputType?: 'integer' | 'decimal';
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    helperText?: string;
    indicator?: "error" | "success" | "warning" | "success";
    helperTextClassName?: string;
}

const Slider: React.FC<ISliderProps> = ({
    value,
    min = 0,
    max = 100,
    step,
    onChange,
    label,
    description,
    containerClassName,
    inputType = 'decimal',
    inputProps,
    helperText,
    indicator,
    helperTextClassName,
}) => {
    const uniqueId = useGenerateUniqueId("slider");
    const dynamicStep = step !== undefined ? step : (inputType === 'integer' ? 1 : 0.1);
    const sliderRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;
        // If inputType is 'decimal', limit to two decimal places
        if (inputType === 'decimal') {
            // Check if the value contains a decimal point
            const decimalIndex = newValue.indexOf('.');
            if (decimalIndex !== -1) {
                // Truncate the value after two decimal places
                newValue = newValue.slice(0, decimalIndex + 3);
            }
        }
        // Parse the value to a float
        let parsedValue = parseFloat(newValue);
        // Check if the new value is not a number (NaN) or less than the minimum
        if (isNaN(parsedValue) || parsedValue < min) {
            parsedValue = min;
        } else if (parsedValue > max) {
            parsedValue = max;
        }
        // Update the value
        onChange({
            ...event,
            target: {
                ...event.target,
                value: parsedValue.toString(),
            },
        });
    };
    
    useEffect(() => {
        if (sliderRef.current) {
            const { offsetLeft, offsetWidth } = sliderRef.current;
            const percent = ((value - min) / (max - min)) * 100;
            const left = offsetLeft + (percent * offsetWidth) / 100 - 15;
            const top = -20;
            setTooltipPosition({ top, left });
        }
    }, [value, min, max]);

    const indicatorColorClasses = {
        error: "border-error text-error focus:border-error",
        success: "border-success text-success focus:border-success",
        warning: "border-warning text-warning focus:border-warning",
        info: "border-success text-info focus:border-info",
    };

    return (
        <div className={`mr-2 ${containerClassName}`}>
            {(label || description) && (
                <div>
                    {label && (
                        <label className='text-base font-medium mt-2'>
                            {label}
                        </label>
                    )}
                    {description && (
                        <p className='text-sm font-normal text-secondary-text'>
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div className='grid grid-cols-5 gap-3 items-center'>
                <div className='col-span-1'>
                    <input
                        type={inputType === "decimal" ? "number" : "text"}
                        id={uniqueId}
                        min={min}
                        max={max}
                        step={dynamicStep}
                        value={value ?? ""}
                        onChange={handleChange}
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-center rounded-md border relative z-[0]
                        ${indicator
                                ? indicatorColorClasses[indicator]
                                : "text-primary-text border-one focus:border-primary"
                            }
                        appearance-none focus:outline-none focus:ring-0 peer`}
                        ref={inputRef}
                        {...inputProps}
                    />
                </div>
                <div className='col-span-4 relative'>
                    <span className='absolute text-xs font-bold text-secondary-text' style={tooltipPosition}>
                        {value}
                    </span>
                    <div className='flex items-center w-full'>
                        <span className='text-xs font-bold text-secondary-text'>
                            {min}
                        </span>
                        <input
                            type='range'
                            id={uniqueId}
                            min={min}
                            max={max}
                            step={dynamicStep}
                            value={value}
                            onChange={onChange}
                            className='flex-1 ml-2 mr-2'
                            ref={sliderRef}
                            {...inputProps}
                        />
                        <span className='text-xs font-bold text-secondary-text'>
                            {max}
                        </span>
                    </div>
                </div>
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

export default Slider;

import "./index.css";

import { useGenerateUniqueId } from "~/hooks/useGenerateUniqueId";

export interface IRadioProps {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  containerClassName?: string;
}

const Radio: React.FC<IRadioProps> = ({
  checked,
  onChange,
  label,
  description,
  inputProps,
  value,
  containerClassName,
}) => {
  const uniqueId = useGenerateUniqueId("radio");

  return (
    <div className={`flex items-center justify-start ${containerClassName}`}>
      <div className='flex items-center justify-center w-5 h-5 mr-2'>
        <input
          id={uniqueId}
          value={value}
          type='radio'
          name='radio'
          checked={checked}
          onChange={onChange}
          {...inputProps}
        />
      </div>
      {(label || description) && (
        <div>
          {label && (
            <label
              htmlFor={uniqueId}
              className='text-base font-medium  ms-2'
            >
              {label}
            </label>
          )}
          {description && (
            <p className='text-sm font-normal text-secondary-text '>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Radio;

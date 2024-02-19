import "./index.css";

export interface ICheckboxProps {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  className?:string;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  value,
  checked,
  onChange,
  label,
  description,
  inputProps,
  className
}) => {
  return (
    <div className='flex flex-1 col-span-1'>
      <div className='flex items-center mr-4'>
        <input
          type='checkbox'
          value={value}
          checked={checked}
          onChange={onChange}
          {...inputProps}
          className={className}
        />
      </div>
      <div>
        {label && (
          <label className='text-sm font-medium text-primary-text '>
            {label}
          </label>
        )}
        {description && (
          <p className='text-xs font-normal text-secondary-text '>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;

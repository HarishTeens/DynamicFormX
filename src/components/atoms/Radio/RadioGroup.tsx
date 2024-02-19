import Radio from "./";
import { IRadioOptions, IRadioValue } from "./types";

interface IRadioGroup {
  value: IRadioValue | null;
  onChange: (value: IRadioValue) => void;
  options: IRadioOptions;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  indicator?: 'error' | 'success' | 'warning' | 'info';
}

const RadioGroup = ({ value, inputProps, options, onChange, }: IRadioGroup) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(options.filter(({ value }) => value === e.target.value)[0]);
  };

  return (
    <div>
      {options && options.map(({ label, description, value: v }, index) => (
        <Radio
          value={v}
          checked={v === value?.value}
          onChange={(e) => handleChange(e)}
          label={label}
          description={description}
          inputProps={inputProps}
          containerClassName="mb-2"  
          key={`radio-group-option-${label}-${index}`}
        />
      ))}
    </div>
  );
};

export default RadioGroup;

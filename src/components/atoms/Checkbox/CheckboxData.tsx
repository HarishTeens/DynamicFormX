import Checkbox from ".";
import { ICheckboxOptions, ICheckboxValue } from "./types";

interface ICheckboxData {
  value: ICheckboxValue[];
  onChange: (value: ICheckboxValue[]) => void;
  options: ICheckboxOptions;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  indicator?: 'error' | 'success' | 'warning' | 'info';
  columnWidth?:number|string;
}

  const CheckboxData: React.FC<ICheckboxData> = ({ value, onChange, options, inputProps,columnWidth }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, checkboxValue: ICheckboxValue) => {
      const newValue = Array.isArray(value)  ? [...value] : [];
      if (e.target.checked) {
        newValue.push(checkboxValue);
      } else {
        const indexToRemove = newValue.indexOf(checkboxValue);
        if (indexToRemove !== -1) {
          newValue.splice(indexToRemove, 1);
        }
      }
      onChange(newValue);
    };

  return (
    <div className="border border-gray-300 p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-wrap items-center">
          <Checkbox
            checked={!!(value.length==options.length)}
            onChange={() => onChange((value.length==options.length)?[]:options.map((opt) => opt.value))}
            label=""
            description=""
            className="rounded-full"
          />
          <label htmlFor="selectAll" className="text-sm">
            Selected all
          </label>
        </div>
        <label className="text-sm">
          Selected: <span style={{ borderRadius: '30px',backgroundColor: value.length > 0 ? '#e6e4ec' : '', color: value.length > 0 ? '#13ca9d' : '', padding: '0.2em 0.5em',}}>{value?.length || 0}</span>
        </label>
      </div>
      <hr />

      <div className="gap-4 mt-1">
        <div className="flex flex-wrap">
          <div className={`grid grid-cols-${columnWidth || 1} gap-4 my-2 w-full`}>
            {options.map(({ label, description, value: v }) => (
              <Checkbox
                value={v}
                checked={!!(value.length && value.find((selectedValue) => selectedValue === v))}
                onChange={(e) => handleChange(e, v)}
                label={label}
                description={description}
                inputProps={inputProps}
                className="rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxData;

export interface ISliderValue {
    label: string;
    value: string | number;
    description?: string;
}

export interface ISliderProps {
    value: ISliderValue;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    label?: string;
    description?: string;
    containerClassName?: string;
}

export type ISliderOptions = Array<ISliderValue>;

export type ISliderOnChange = (event: React.ChangeEvent<HTMLInputElement> | number) => void;

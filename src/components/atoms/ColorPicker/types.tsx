export interface IInputProps {
    value: string | undefined;
    onChange: (newColor: string) => void;
  }

export type IColorOnChange = (color: string) => void;

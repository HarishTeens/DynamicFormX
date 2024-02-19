export interface ICheckboxOption {
    label: string;
    value: string | number;
    description?: string;
  }

  export type ICheckboxValue= number|string
  
  export type ICheckboxOptions = Array<ICheckboxOption>;
  
  export type ICheckboxOnChange = (value: ICheckboxValue[]) => void;
  
  export type IEditor = (value:string) => void;
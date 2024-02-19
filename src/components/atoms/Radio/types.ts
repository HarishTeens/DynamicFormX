export interface IRadioValue {
  label: string;
  value: string | number;
  description?: string;
}

export type IRadioOptions = Array<IRadioValue>;

export type IRadioOnChange = (value: IRadioValue) => void;

export type IEditor = (value:string) => void;
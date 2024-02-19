import { ActionMeta, MultiValue, SingleValue } from "react-select";

export interface ISelectOption {
  value: string | boolean | number;
  label: string;
}

export type ISelectValue =
  | SingleValue<ISelectOption>
  | MultiValue<ISelectOption>;

export type ISelectOnChange = (
  newSelectValue: (selectValue: ISelectValue) => void,
  actionMeta: ActionMeta<ISelectOption>
) => void;

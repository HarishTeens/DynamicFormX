import { IInputFieldsState } from "./IInputFieldsState";

export interface IFormCategoryData {
  columnSize: 0;
  displayLabel: boolean;
  floatingbutton: boolean;
  id: string;
  name: string;
  readOnly: boolean;
  retainInfo: boolean;
  type: string;
  value: string;
  options: Array<{ key: string; value: string }>;
}

export interface ICategory {
  title: string;
  formFieldData: IInputFieldsState;
  priority: number;
}

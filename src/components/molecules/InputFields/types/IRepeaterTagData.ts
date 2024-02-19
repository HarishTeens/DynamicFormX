import { IFormCategoryData } from "./IFormCategoryData";
import { IInputFieldsState, IInputRepeaterTagFieldState } from "./IInputFieldsState";
import { IUseInputFields } from "./IUseInputFields";

export interface IRepeaterTagData {
  columnSize: number;
  displayLabel: boolean;
  floatingbutton: boolean;
  id: string;
  name: string;
  readOnly: boolean;
  retainInfo: boolean;
  type: "repeater" | "tags";
  options: Array<{ key: string; value: string }>;
}

export interface IRepeaterValues {
  [key: string]: object[] | IRepeaterValues;
}

export interface IRepeaterInputFieldsProps {
  repeaterInput: IInputRepeaterTagFieldState;
  handleSetKey: IUseInputFields['handleSetKey'];
  disableAll?: boolean;
}

export type IUpdateRepeaterParentState = (key: number, repeaterState: IInputFieldsState | IInputRepeaterTagFieldState) => void
export interface IRepeaterGroupProps {
  rKey: number,
  index: number,
  repeaterInput: IInputRepeaterTagFieldState,
  disableAll?: boolean,
  handleDeleteRepeaterClick: (index: number) => void,
  updateParentState: IUpdateRepeaterParentState
}

export interface ITagGroupProps {
  tKey: number,
  index: number,
  repeaterInput: IInputRepeaterTagFieldState,
  formCategoryData?: IFormCategoryData,
  disableAll?: boolean,
  handleDeleteRepeaterClick: (index: number) => void,
  updateParentState: IUpdateRepeaterParentState
}
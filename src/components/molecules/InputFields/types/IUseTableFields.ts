import {
  IInputField,
  IInputFieldState,
  IInputFieldsState,
} from "./IInputFieldsState";
import { IHandleInputBlur, IHandleInputChangeReturnValues, IHandleSetKey } from "./IUseInputFields";
import { IFormCategoryData } from "./IFormCategoryData";
import { IField } from "~/components/atoms/TableCategory/types";

export type ITableMapState = {
  [key: string]: IInputFieldsState
}
export type IHandleInputChange = (
  inputFieldState: IInputFieldState
) => IHandleInputChangeReturnValues

export type ITableHandleInputBlur = (
  colKey: IField["title"]
) => IHandleInputBlur;

export type ITableHandleSetKey = (
  colKey: IField["title"]
) => IHandleSetKey;

export type IInputFieldStateValue = string | number | boolean | object | undefined;

export type ITableMapStateValue = {
  [key: string]: {
    [key: string]: IInputFieldStateValue;
  }
};
export type IGetTableValues = (
  inputFieldsState: ITableMapState
) => Record<string, IInputFieldStateValue>;

export type ICheckRequiredFields = (
  setErrors: boolean
) => boolean;

export type IHandleSetValues = (
  inputFields:  Array<IInputField> | ITableMapState,
  data?: {
    formCategoryData?: IFormCategoryData | undefined
  }
) => void;


export interface IUseTableFields {
  values: ITableMapState;
  handleSetValues: IHandleSetValues;
  getValues: () => ReturnType<IGetTableValues>;
  handleInputBlur: ITableHandleInputBlur;
  checkRequiredFields: (setError?: boolean) => ReturnType<ICheckRequiredFields>;
  handleFieldChange: (idx: number, value: string) => void;
  handleInputChange: (colKey: IField["title"]) => IHandleInputChange;
  handleCellChange: (colKey: IField["title"], fieldKey: string, value: string) => void;
  addColumn: () => void;
  deleteColumn: (colKey: IField["title"]) => void;
  handleTableSetKey: ITableHandleSetKey;
}

export type IUseTableFieldsHook = (
) => IUseTableFields;

import { IInputOnBlur, IInputOnChange } from "~/components/atoms/Input/types";
import { IRadioOnChange } from "~/components/atoms/Radio/types";
import { ISelectOnChange } from "~/components/atoms/Select/types";
import { ICheckboxOnChange } from "~/components/atoms/Checkbox/types";


import {
  IInputField,
  IInputFieldsState,
  IInputFieldState,
  IInputRepeaterTagFieldState,
} from "./IInputFieldsState";
import { IFileOnChange } from "~/components/atoms/UploadInput/types";
import { IRepeaterTagData, IRepeaterValues } from "./IRepeaterTagData";

export type IHandleInputChangeReturnValues = IInputOnChange | ISelectOnChange | IRadioOnChange | IFileOnChange | ICheckboxOnChange | ((value: string) => void);
export type IHandleInputChange = (
  inputFieldState: IInputFieldState,
) => IHandleInputChangeReturnValues

export type IHandleInputBlur = (
  InputFields: IInputFieldState,
) => IInputOnBlur;

export type IHandleSetKey = (
  id: IInputFieldState["id"],
  key: keyof IInputFieldState | keyof IInputRepeaterTagFieldState,
  inputValue: IInputFieldState["inputValue"]
) => void;

export type IInputFieldStateValue = string | number | boolean | undefined;
export type IRepeaterValue = Array<
  Record<string, IInputFieldStateValue | IRepeaterValue>
>;
export type IGetValues = (
  inputFieldsState: IInputFieldsState
) => Record<string, IInputFieldStateValue>;

export type ICheckRequiredFields = (
  setErrors: boolean,
  inputFieldsState: IInputFieldsState
) => boolean;

export type IHandleSetValues = (
  inputFields: Array<IInputField> | IInputFieldsState,
  data?: {
    repeaterData?: Array<IRepeaterTagData>,
    repeaterValues?: IRepeaterValues,
    tagData?: IRepeaterTagData | null
    tagValues?: IRepeaterValues
  }
) => void;

export interface AllInputFields extends Omit<IInputFieldState, "options">, Omit<IInputRepeaterTagFieldState, "type"> { }
export type IHandleSetRepeaterKey = (
  id: IInputFieldState["id"],
  key: keyof AllInputFields,
  inputValue: IInputFieldState["inputValue"],
  repeaterId: string | undefined,
  repeaterIndex: number | undefined
) => IInputRepeaterTagFieldState | undefined;

export interface IUseInputFields {
  values: IInputFieldsState;
  handleSetValues: IHandleSetValues;
  handleInputChange: IHandleInputChange;
  handleInputBlur: IHandleInputBlur;
  handleSetKey: IHandleSetKey;
  getValues: () => ReturnType<IGetValues>;
  checkRequiredFields: (setError?: boolean) => ReturnType<ICheckRequiredFields>;
}

export type IUseInputFieldsHook = (
) => IUseInputFields;

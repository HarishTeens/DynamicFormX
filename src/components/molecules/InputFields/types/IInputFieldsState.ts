import { ICheckboxValue } from "~/components/atoms/Checkbox/types";
import { IRadioValue } from "~/components/atoms/Radio/types";
import { ISelectOption, ISelectValue } from "~/components/atoms/Select/types";

import { IInputFieldResponse, IInputValue } from "./IInputFields";
import { IRepeaterTagData, IRepeaterValues } from "./IRepeaterTagData";
import { IFileUploadResponse } from "~/components/atoms/UploadInput";

// Input Json (array item) that we get from server
export type IFeatureValidate = (value: IInputStateProperties['inputValue'], required: boolean) => boolean
export interface IInputField extends Omit<IInputFieldResponse, "options"> {
  options: Array<ISelectOption> | null;
  validate?: IFeatureValidate; // for feature fields
}

// Additional properties that we need for each input
// inputValue is the actual state that contains the value of
// the input field
export interface IInputStateProperties {
  isError: boolean;
  errorMsg: string;
  inputValue: IInputValue | ISelectValue | ICheckboxValue | IRadioValue | IFileUploadResponse[]
  hide: boolean;
}

// describes the input completely = state details + input properties
export interface IInputFieldState extends IInputField, IInputStateProperties {
  slider?: boolean;
  colorpicker?: boolean;
  blurred?: boolean;
}

export interface IInputRepeaterTagFieldState extends IRepeaterTagData {
  type: "repeater" | "tags";
  repeaterFields: IInputFieldsState;
  repeaterFormFields?: Record<number, IInputFieldsState>;
  repeaterValues?: IRepeaterValues;
  tagParentInput?: string;
}

export type ICheckRequiredFields2 = () => boolean;
export type IInputFieldsState = Record<
  IInputField["id"],
  IInputFieldState | IInputRepeaterTagFieldState
> | Record<"checkRequiredFields", ICheckRequiredFields2>;

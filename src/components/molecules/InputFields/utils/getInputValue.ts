/* eslint-disable no-case-declarations */
import { MultiValue, SingleValue } from "react-select";

import { ISelectOption, ISelectValue } from "../../../atoms/Select/types";
import { IInputFieldState } from "../types/IInputFieldsState";

export const getInputValue = (
  inputField: IInputFieldState
): IInputFieldState["inputValue"] => {
  switch (inputField?.type) {
    case "select":
    case "dropdown":
    case "radio":
    case "radio-buttons":
      if (inputField.type === "dropdown" && inputField.multiSelect) {
        if (!inputField.inputValue) return [];
        return (inputField?.inputValue as MultiValue<ISelectOption>)?.map(item => item.value) as unknown as ISelectValue;
      } else
        return (inputField.inputValue as SingleValue<ISelectOption>)?.value || ""

    case "checkbox":
      return inputField?.inputValue;

    case "number":
    case "decimal":
    case "integer":
      return Number(inputField.inputValue);

    case "date":
      const dateValue = String((inputField as IInputFieldState).inputValue);
      const epochValue = Date.parse(dateValue);
      return isNaN(epochValue) ? null : epochValue;

    case "password":
    case "text":
    default:
      return inputField?.inputValue;
  }
};

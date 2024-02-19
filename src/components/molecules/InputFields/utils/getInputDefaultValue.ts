import { ISelectValue } from "../../../atoms/Select/types";
import { IInputField, IInputFieldState } from "../types/IInputFieldsState";

export const getInputDefaultValue = (
  inputField: IInputField
): IInputFieldState["inputValue"] => {
  switch (inputField?.type) {
    case "select":
    case "dropdown":
    case "radio":
    case "radio-buttons":
      return inputField.options?.filter(
        (option) => option.value === `${inputField.defaultValue}`
      )[0] as ISelectValue;

    case "checkbox":
      return false;

    case "text":
    case "number":
    case "password":
    default:
      return inputField?.defaultValue;
  }
};

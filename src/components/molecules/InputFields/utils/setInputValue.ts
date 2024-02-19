/* eslint-disable no-case-declarations */
import { IInputField, IInputFieldState } from "../types/IInputFieldsState";

export const setInputValue = (
  inputField: IInputField
): IInputFieldState["inputValue"] => {
  console.log("setInputValue", inputField?.value, inputField?.type, inputField?.options);
  switch (inputField?.type) {
    case "select":
    case "dropdown":
      if (!inputField.options) return "";
      if (Array.isArray(inputField.value)) {
        const values = inputField.value as Array<string | number | boolean>;
        const options = inputField.options.filter(option => values.includes(option.value))
        return options;
      } else {
        console.log("inside dropdown render", inputField.value, inputField.options);
        const optionIndex = inputField.options?.findIndex((option) => option.value == inputField.value) // sometimes value is string and sometimes number
        if (optionIndex === -1) return inputField.options[0]
        return inputField.options[optionIndex];
      }

    case "date":
      const unix = (inputField.value as number);
      if (!unix) return null;
      const date = new Date(unix);
      return date.toISOString().slice(0, 10);

    case "radio":
    case "radio-buttons":
      return inputField.options?.find(option => option.value === inputField.value) || "";
    case "upload":
    case "number":
    case "decimal":
    case "integer":
    case "password":
    case "text":
    case "checkbox":
    default:
      return inputField.value;
  }
};

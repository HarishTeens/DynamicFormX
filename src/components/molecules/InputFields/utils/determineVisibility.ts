import {
  IInputFieldsState,
  IInputFieldState,
} from "../types/IInputFieldsState";
import { IHandleSetKey } from "../types/IUseInputFields";
import { getInputValue } from "./getInputValue";

export type IDetermineVisibility = (
  currentInput: IInputFieldState,
  values: IInputFieldsState,
  handleSetKey: IHandleSetKey
) => void;

export const determineVisibility: IDetermineVisibility = (
  dependentInput,
  values,
  handleSetKey
) => {
  const handleVisibilityFieldSet = (currentInput: IInputFieldState) => {
    if (currentInput.visibilityField === "show" && currentInput.hide) {
      handleSetKey(currentInput.id, "hide", false);
    }
    if (currentInput.visibilityField === "hide" && !currentInput.hide) {
      handleSetKey(currentInput.id, "hide", true);
    }
    if (currentInput.visibilityField === "readonly" && !currentInput.readOnly) {
      handleSetKey(currentInput.id, "readOnly", true);
    }
    if (
      currentInput.visibilityField === "defaultvalue" &&
      !currentInput.inputValue
    ) {
      handleSetKey(currentInput.id, "inputValue", currentInput.defaultValue);
    }
    if (currentInput.visibilityField === "required" && !currentInput.required) {
      handleSetKey(currentInput.id, "required", true);
    }
  };

  const handleVisibilityFieldUnset = (currentInput: IInputFieldState) => {
    if (currentInput.visibilityField === "show" && !currentInput.hide) {
      handleSetKey(currentInput.id, "hide", true);
    }
    if (currentInput.visibilityField === "hide" && currentInput.hide) {
      handleSetKey(currentInput.id, "hide", false);
    }
    if (currentInput.visibilityField === "readonly" && currentInput.readOnly) {
      handleSetKey(currentInput.id, "readOnly", false);
    }
    if (
      currentInput.visibilityField === "defaultvalue" &&
      currentInput.inputValue
    ) {
      handleSetKey(currentInput.id, "inputValue", "");
    }
    if (currentInput.visibilityField === "required" && currentInput.required) {
      handleSetKey(currentInput.id, "required", false);
    }
  };

  const evalVisibilityOperation = (
    op: "equals" | "notequals" | "greaterthan" | "greaterthanequalto" | "lessthan" | "lessthanequalto" | "like" | "notlike" | "in" | "notin" | "isempty" | "isnotempty" | null,
    v1: string | null,
    v2Actual: ReturnType<typeof getInputValue>
  ) => {
    // getInputValue gives the value of input field
    // with the correct type. For numbers it'll give
    // a number but here only strings are compared
    const v2 = `${v2Actual}`;

    if (v1 === null) return false;
    if (v2 === null) return false;

    switch (op) {
      case "equals":
        return v1 === v2;
      case "notequals":
        return v1 !== v2;
      case "greaterthan":
        return v1 > v2;
      case "greaterthanequalto":
        return v1 >= v2;
      case "lessthan":
        return v1 < v2;
      case "lessthanequalto":
        return v1 <= v2;
      // case "like":
      // case "notlike":
      // case "in":
      // case "notin":
      case "isempty":
        return v1 === "";
      case "isnotempty":
        return v1 !== "";
      default:
        return false;
    }
  };

  const matchingInputs = Object.values(values).filter(valueObj => {
    const fieldState = valueObj as IInputFieldState;
    return fieldState.visibilityCondition === dependentInput.id;
  }) as IInputFieldState[];

  matchingInputs.forEach((currentInput) => {
    if (currentInput) {
      if (currentInput.visibilityEvent === "onchange") {
        const evalResult = evalVisibilityOperation(
          currentInput.visibilityOperation,
          currentInput.visibilityOperationMatchValue,
          getInputValue(dependentInput)
        );
        if (evalResult) {
          handleVisibilityFieldSet(currentInput);
        } else {
          handleVisibilityFieldUnset(currentInput);
        }
      }
    }
  });
};

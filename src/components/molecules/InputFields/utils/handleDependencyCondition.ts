import {
  IInputFieldsState,
  IInputFieldState,
} from "../types/IInputFieldsState";
import { IHandleSetKey } from "../types/IUseInputFields";
import { evaluateExpression } from "./evaluateExpression";
import { extractVariables } from "./extractVariables";

export type IHandleDependencyCondition = (
  currentInput: IInputFieldState,
  onChangeInputId: string,
  onChangeValue: IInputFieldState["inputValue"],
  values: IInputFieldsState,
  handleSetKey: IHandleSetKey
) => void;

export const handleDependencyCondition: IHandleDependencyCondition = (
  currentInput,
  onChangeInputId,
  onChangeValue,
  values,
  handleSetKey
) => {
  if (currentInput.dependencyCondition) {
    if (currentInput.dependencyEvent === "onchange") {
      // onchange handler
      const dependentInput = values[
        currentInput.dependencyCondition as keyof IInputFieldsState
      ] as IInputFieldState;

      if (!dependentInput) return;
      const variables = extractVariables(
        dependentInput.expression as string,
        values,
        onChangeInputId,
        onChangeValue
      );

      const value = evaluateExpression(
        dependentInput.expression as string,
        variables
      );
      handleSetKey(currentInput.dependencyCondition, "inputValue", value);

      // Hack to send updated values to the recursive child call
      values[currentInput.dependencyCondition as keyof IInputFieldsState] = {
        ...dependentInput,
        inputValue: value || "",
      };

      handleDependencyCondition(
        dependentInput,
        onChangeInputId,
        onChangeValue,
        values,
        handleSetKey
      );
    }

    if (currentInput.dependencyEvent === "onload") {
      // onload handler
    }
  }
};

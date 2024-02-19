/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ISelectOption, ISelectValue } from "../../../atoms/Select/types";
import {
  IInputFieldsState,
  IInputFieldState,
} from "../types/IInputFieldsState";
import { IHandleSetKey } from "../types/IUseInputFields";
import { evaluateStringExpression } from "./evaluateExpression";
import { extractVariables } from "./extractVariables";
import { setInputValue } from "./setInputValue";

export type IHandleDependencyCondition = (
  currentInput: IInputFieldState,
  onChangeValue: ISelectValue | number | undefined,
  values: IInputFieldsState,
  handleSetKey: IHandleSetKey
) => Promise<void>;

export const handleRestUrlDependencyCondition: IHandleDependencyCondition = async (
  currentInput,
  onChangeValue,
  values,
  handleSetKey
) => {
  if (currentInput.dependencyCondition) {
    if (currentInput.dependencyEvent === "onchange") {
      const dependentInput = values[
        currentInput.dependencyCondition as never
      ] as IInputFieldState;
      if (dependentInput && dependentInput.restUrl) {
        if (onChangeValue === undefined || onChangeValue === null) {
          if (dependentInput.type === "dropdown") {
            handleSetKey(dependentInput.id, "options", []);
          } else {
            dependentInput.value = "";
            handleSetKey(dependentInput.id, "inputValue", setInputValue(dependentInput));
          }
          if (dependentInput.dependencyEvent === "onchange") {
            handleRestUrlDependencyCondition(
              dependentInput,
              undefined,
              values,
              handleSetKey
            );
          }
          return;
        }
        const variables = extractVariables(
          dependentInput.restUrl as string,
          values,
          currentInput.id,
          onChangeValue
        );
        let newVariables = {};
        if (currentInput.type == 'dropdown') {
          for (const key in variables) {
            newVariables[key as never] = variables[key as never]?.value;
          }
        } else {
          newVariables = variables
        }

        if (Object.values(newVariables).some((value) => value === undefined)) {
          return;
        }
        const restUrl = evaluateStringExpression(
          dependentInput.restUrl as string,
          newVariables
        );
        try {
          const resultData = await Post(`/v2/restUrl/fetch`, {
            url: restUrl,
          });
          if (dependentInput.type == 'dropdown') {
            const transformedOptions = resultData.map((option: ISelectOption) => ({
              label: option.value,
              value: option.key,
            }));
            handleSetKey(dependentInput.id, "options", transformedOptions);
            handleSetKey(dependentInput.id, "inputValue", setInputValue(dependentInput));
          }
          if (dependentInput.type == 'integer' || dependentInput.type == 'string') {
            dependentInput.value = resultData[0].value;
            handleSetKey(dependentInput.id, "inputValue", setInputValue(dependentInput));
            if (dependentInput.dependencyEvent === "onchange") {
              handleRestUrlDependencyCondition(
                dependentInput,
                resultData[0].value,
                values,
                handleSetKey
              );
            }
          }
        } catch (error) {
          console.log("error with fetching RestURL ", error, dependentInput);
        }

      }

    }

  }
};

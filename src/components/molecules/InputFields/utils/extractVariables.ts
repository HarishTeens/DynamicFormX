import {
  IInputFieldsState,
  IInputFieldState,
} from "../types/IInputFieldsState";
import { getInputValue } from "./getInputValue";

export const extractVariablesInArray = (expression: string | undefined) => {
  // Use a regular expression to find all variable placeholders
  const variableMatches = expression?.match(/\{([^}]+)\}/g);

  // If there are no matches, return an empty array
  if (!variableMatches) {
    return [];
  }

  // Extract variable names from the matches
  const variables = variableMatches.map((match) =>
    match.replace(/[{}]/g, "").trim()
  );

  // Remove duplicate variable names
  const uniqueVariables = Array.from(new Set(variables)) as (keyof IInputFieldsState)[];

  return uniqueVariables;
};

export const extractVariables = (
  expression: string,
  values: IInputFieldsState,
  onChangeInputId: string,
  onChangeValue: IInputFieldState["inputValue"]
) => {
  const variableArray = extractVariablesInArray(expression);

  return variableArray.reduce((acc, curr) => {
    const inputField = values[curr] as IInputFieldState;

    return {
      ...acc,
      [curr]:
        curr === onChangeInputId ? onChangeValue : getInputValue(inputField),
    };
  }, {});
};

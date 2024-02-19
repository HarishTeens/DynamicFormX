/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  IInputFieldState,
} from "../types/IInputFieldsState";
import { IHandleSetKey } from "../types/IUseInputFields";

export type IHandleTagsCreation = (
  inputFieldState: IInputFieldState,
  handleSetKey: IHandleSetKey,
  currentValue: string
) => void;

export const handleTagsCreation: IHandleTagsCreation = (
  inputFieldState,
  handleSetKey,
  currentValue
) => {
  if (inputFieldState.tagAssociation && inputFieldState.tagAssociatedValue) {
    if (
      inputFieldState.tagOperation &&
      inputFieldState.tagOperationMatchValue &&
      inputFieldState.tagOperation === "greaterthanequalto" &&
      parseInt(currentValue as string) >=
      (inputFieldState.tagOperationMatchValue as number)
    ) {
      const tagName = inputFieldState.tagAssociatedValue;

      handleSetKey(tagName, "tagParentInput", inputFieldState.id);
      handleSetKey(
        tagName,
        // @ts-ignore
        "repeaterFormFields",
        Array.from(Array(parseInt(currentValue)).keys()).map(k => k + 1).reduce(
          (acc, curr) => ({
            ...acc,
            [Date.now() + curr * 10]: {},
          }),
          {}
        )
      );
    }
  }
};
